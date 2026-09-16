import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import LotteryTabs from './LotteryTabs';

type GanadazoStrategy = 'balanced' | 'frequent' | 'overdue';

interface GanadazoDraw {
  id: string;
  date: string;
  numbers: number[];
  jackpot: number | null;
}

interface NumberStat {
  number: number;
  frequency: number;
  gap: number;
}

interface GanadazoStatistics {
  frequency: Record<number, number>;
  gap: Record<number, number>;
  rankedByFrequency: NumberStat[];
  hotNumbers: number[];
  overdueNumbers: number[];
  history: Set<string>;
  latestNumbers: number[];
  idealSum: { min: number; max: number };
}

interface GanadazoPrediction {
  numbers: number[];
  strategy: GanadazoStrategy;
  sum: number;
  oddCount: number;
  hotCount: number;
  overdueCount: number;
}

const MIN_NUMBER = 1;
const MAX_NUMBER = 40;
const NUMBERS_PER_PLAY = 5;
const REMOTE_DATA_URL = 'https://xsuerte-landing-zone-prod.s3.us-east-1.amazonaws.com/latest/torito_ganadazo.json';
const LOCAL_DATA_URL = '/data/torito_ganadazo.json';

const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  maximumFractionDigits: 0,
});

const normalizeNumbers = (values: unknown): number[] | null => {
  if (!Array.isArray(values)) return null;

  const numbers = Array.from(new Set(values.filter(
    (value): value is number => Number.isInteger(value) && value >= MIN_NUMBER && value <= MAX_NUMBER,
  )));

  return numbers.length === NUMBERS_PER_PLAY ? numbers : null;
};

const percentile = (sortedValues: number[], ratio: number) => {
  const index = Math.floor((sortedValues.length - 1) * ratio);
  return sortedValues[index];
};

const buildStatistics = (draws: GanadazoDraw[]): GanadazoStatistics => {
  const frequency: Record<number, number> = {};
  const gap: Record<number, number> = {};

  for (let number = MIN_NUMBER; number <= MAX_NUMBER; number++) {
    frequency[number] = 0;
    gap[number] = draws.length;
  }

  draws.forEach((draw, drawIndex) => {
    draw.numbers.forEach((number) => {
      frequency[number]++;
      if (gap[number] === draws.length) gap[number] = drawIndex;
    });
  });

  const numberStats = Array.from({ length: MAX_NUMBER }, (_, index) => {
    const number = index + MIN_NUMBER;
    return { number, frequency: frequency[number], gap: gap[number] };
  });
  const rankedByFrequency = [...numberStats].sort((left, right) => right.frequency - left.frequency);
  const rankedByGap = [...numberStats].sort((left, right) => right.gap - left.gap);
  const sums = draws
    .map((draw) => draw.numbers.reduce((total, number) => total + number, 0))
    .sort((left, right) => left - right);

  return {
    frequency,
    gap,
    rankedByFrequency,
    hotNumbers: rankedByFrequency.slice(0, 12).map((item) => item.number),
    overdueNumbers: rankedByGap.slice(0, 12).map((item) => item.number),
    history: new Set(draws.map((draw) => [...draw.numbers].sort((left, right) => left - right).join(','))),
    latestNumbers: draws[0]?.numbers ?? [],
    idealSum: {
      min: percentile(sums, 0.2),
      max: percentile(sums, 0.8),
    },
  };
};

const createCandidate = (statistics: GanadazoStatistics, strategy: GanadazoStrategy) => {
  const pool: number[] = [];
  const maximumFrequency = statistics.rankedByFrequency[0]?.frequency || 1;
  const maximumGap = Math.max(...Object.values(statistics.gap), 1);

  for (let number = MIN_NUMBER; number <= MAX_NUMBER; number++) {
    const frequencyWeight = statistics.frequency[number] / maximumFrequency;
    const gapWeight = statistics.gap[number] / maximumGap;
    let weight = 1;

    if (strategy === 'frequent') weight += frequencyWeight * 18;
    else if (strategy === 'overdue') weight += gapWeight * 20;
    else weight += frequencyWeight * 5 + gapWeight * 5;

    for (let entry = 0; entry < Math.max(1, Math.floor(weight * 8)); entry++) pool.push(number);
  }

  const selection = new Set<number>();
  while (selection.size < NUMBERS_PER_PLAY) {
    selection.add(pool[Math.floor(Math.random() * pool.length)]);
  }

  return [...selection];
};

const scoreCandidate = (
  candidate: number[],
  statistics: GanadazoStatistics,
  strategy: GanadazoStrategy,
) => {
  const sum = candidate.reduce((total, number) => total + number, 0);
  if (sum < statistics.idealSum.min || sum > statistics.idealSum.max) return -1;

  const oddCount = candidate.filter((number) => number % 2 !== 0).length;
  if (oddCount === 0 || oddCount === NUMBERS_PER_PLAY) return -1;

  const sorted = [...candidate].sort((left, right) => left - right);
  const consecutivePairs = sorted.filter((number, index) => sorted[index + 1] === number + 1).length;
  if (consecutivePairs > 2) return -1;

  const decades = [0, 0, 0, 0];
  candidate.forEach((number) => decades[Math.floor((number - 1) / 10)]++);
  if (decades.some((count) => count >= 4)) return -1;

  const latestOverlap = candidate.filter((number) => statistics.latestNumbers.includes(number)).length;
  if (latestOverlap > 2) return -1;

  const hotCount = candidate.filter((number) => statistics.hotNumbers.includes(number)).length;
  const overdueCount = candidate.filter((number) => statistics.overdueNumbers.includes(number)).length;
  const parityScore = oddCount === 2 || oddCount === 3 ? 0.25 : 0.1;
  const overlapScore = latestOverlap === 1 ? 0.15 : 0.05;

  if (strategy === 'frequent') return parityScore + overlapScore + (hotCount / NUMBERS_PER_PLAY) * 0.6;
  if (strategy === 'overdue') return parityScore + overlapScore + (overdueCount / NUMBERS_PER_PLAY) * 0.6;
  return parityScore + overlapScore + (hotCount >= 1 && overdueCount >= 1 ? 0.6 : 0.25);
};

const generateGanadazoPrediction = (
  statistics: GanadazoStatistics,
  strategy: GanadazoStrategy,
): GanadazoPrediction | null => {
  let bestCandidate: number[] | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < 5000; attempt++) {
    const candidate = createCandidate(statistics, strategy);
    const key = [...candidate].sort((left, right) => left - right).join(',');
    if (statistics.history.has(key)) continue;

    const score = scoreCandidate(candidate, statistics, strategy);
    if (score > bestScore) {
      bestCandidate = candidate;
      bestScore = score;
    }
    if (bestScore >= 0.95) break;
  }

  if (!bestCandidate) return null;

  const numbers = [...bestCandidate].sort((left, right) => left - right);
  return {
    numbers,
    strategy,
    sum: numbers.reduce((total, number) => total + number, 0),
    oddCount: numbers.filter((number) => number % 2 !== 0).length,
    hotCount: numbers.filter((number) => statistics.hotNumbers.includes(number)).length,
    overdueCount: numbers.filter((number) => statistics.overdueNumbers.includes(number)).length,
  };
};

export default function GanadazoExpert() {
  const [draws, setDraws] = useState<GanadazoDraw[]>([]);
  const [strategy, setStrategy] = useState<GanadazoStrategy>('balanced');
  const [prediction, setPrediction] = useState<GanadazoPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const generatedInitialPrediction = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    const processData = (data: unknown) => {
      if (!Array.isArray(data)) throw new Error('Formato de datos inválido');

      const formattedDraws = data
        .map((item): GanadazoDraw | null => {
          const numbers = normalizeNumbers(item?.n);
          if (!numbers) return null;

          return {
            id: String(item.id),
            date: String(item.f),
            numbers,
            jackpot: Number.isFinite(item.p) ? Number(item.p) : null,
          };
        })
        .filter((draw): draw is GanadazoDraw => draw !== null);

      if (formattedDraws.length === 0) throw new Error('No hay sorteos válidos de Ganadazo');
      setDraws(formattedDraws);
      setError(null);
    };

    fetch(REMOTE_DATA_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo consultar S3');
        return response.json();
      })
      .then(processData)
      .catch((remoteError) => {
        if (remoteError.name === 'AbortError') return;
        fetch(LOCAL_DATA_URL, { signal: controller.signal })
          .then((response) => {
            if (!response.ok) throw new Error('No se pudo consultar el respaldo local');
            return response.json();
          })
          .then(processData)
          .catch((fallbackError) => {
            if (fallbackError.name !== 'AbortError') setError('No se pudo cargar el historial de Torito Ganadazo.');
          });
      });

    return () => controller.abort();
  }, []);

  const statistics = useMemo(() => draws.length > 0 ? buildStatistics(draws) : null, [draws]);
  const latestJackpot = draws[0]?.jackpot ?? null;

  const virtualizer = useVirtualizer({
    count: draws.length,
    getScrollElement: () => historyRef.current,
    estimateSize: () => 68,
    overscan: 6,
  });

  const generatePrediction = () => {
    if (!statistics) return;
    setLoading(true);

    window.setTimeout(() => {
      setPrediction(generateGanadazoPrediction(statistics, strategy));
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (statistics && !generatedInitialPrediction.current) {
      generatedInitialPrediction.current = true;
      setPrediction(generateGanadazoPrediction(statistics, 'balanced'));
    }
  }, [statistics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-900 to-red-950 pb-12 text-slate-200">
      <header className="sticky top-0 z-50 border-b border-yellow-500/30 bg-red-800/90 shadow-2xl backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
          <div>
            <h1 className="text-3xl font-black italic tracking-normal text-white">
              TORITO<span className="text-yellow-400">EXPERT</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400/80">IA Predictiva Torito Ganadazo</p>
          </div>
          <LotteryTabs activeLottery="torito-ganadazo" />
          {draws.length > 0 && (
            <div className="text-center sm:text-right">
              <p className="text-sm font-bold text-white">{draws.length} sorteos procesados</p>
              <p className="text-xs text-yellow-300">Último sorteo: {draws[0].date}</p>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        {!draws.length && !error && <p className="py-32 text-center text-xl font-bold">Cargando historial de Ganadazo...</p>}
        {error && <p className="border border-red-500 bg-red-950 p-6 text-center font-bold text-red-300">{error}</p>}

        {statistics && (
          <>
            <section className="flex flex-col justify-between gap-4 border border-yellow-400/50 bg-red-900/60 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase text-yellow-300">Pozo del último sorteo</p>
                <p className="mt-1 text-3xl font-black text-white">
                  {latestJackpot === null ? 'No disponible' : currencyFormatter.format(latestJackpot)}
                </p>
              </div>
              <p className="max-w-md text-sm text-slate-300">Ganadazo analiza exclusivamente combinaciones de 5 números entre el 1 y el 40.</p>
            </section>

            <div className="grid gap-8 lg:grid-cols-12">
              <section className="space-y-5 border border-red-700 bg-red-950/60 p-6 lg:col-span-4">
                <h2 className="text-sm font-black uppercase text-yellow-400">Estrategia Ganadazo</h2>
                {([
                  ['balanced', 'Equilibrada', 'Combina frecuencia, ausencia, suma y paridad.'],
                  ['frequent', 'Frecuentes', 'Prioriza los números más repetidos de Ganadazo.'],
                  ['overdue', 'Rezagados', 'Prioriza los números con mayor ausencia actual.'],
                ] as const).map(([value, label, description]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStrategy(value)}
                    className={`w-full border-2 p-4 text-left transition-colors ${strategy === value ? 'border-yellow-400 bg-yellow-400/15' : 'border-red-800 bg-red-950 hover:border-red-600'}`}
                  >
                    <span className="block font-black text-white">{label}</span>
                    <span className="mt-1 block text-xs text-slate-400">{description}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={generatePrediction}
                  disabled={loading}
                  className="w-full bg-yellow-400 px-5 py-4 text-lg font-black text-red-950 transition-colors hover:bg-yellow-300 disabled:opacity-60"
                >
                  {loading ? 'CALCULANDO...' : 'GENERAR JUGADA'}
                </button>
              </section>

              <section className="flex min-h-[430px] flex-col items-center justify-center border-4 border-yellow-400 bg-red-700 p-6 lg:col-span-8">
                {prediction ? (
                  <div className="w-full text-center">
                    <p className="text-xs font-bold uppercase text-yellow-200">Torito Ganadazo</p>
                    <h2 className="mt-2 text-4xl font-black text-white">TU COMBINACIÓN</h2>
                    <div className="my-12 flex flex-wrap justify-center gap-4 sm:gap-7">
                      {prediction.numbers.map((number) => (
                        <div key={number} className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-yellow-400 bg-white text-4xl font-black text-red-700 shadow-xl sm:h-24 sm:w-24">
                          {number}
                        </div>
                      ))}
                    </div>
                    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                      <Metric label="Suma" value={String(prediction.sum)} detail={`Ideal: ${statistics.idealSum.min}-${statistics.idealSum.max}`} />
                      <Metric label="Impar / Par" value={`${prediction.oddCount}/${NUMBERS_PER_PLAY - prediction.oddCount}`} detail="Ideal: 2/3 o 3/2" />
                      <Metric label="Frecuentes" value={`${prediction.hotCount}/5`} detail="Top 12" />
                      <Metric label="Rezagados" value={`${prediction.overdueCount}/5`} detail="Top 12" />
                    </div>
                  </div>
                ) : <p className="font-bold text-white">Motor Ganadazo en espera</p>}
              </section>
            </div>

            <section className="grid gap-6 md:grid-cols-2">
              <Ranking title="Los 5 más frecuentes" items={statistics.rankedByFrequency.slice(0, 5)} valueLabel="veces" valueKey="frequency" />
              <Ranking title="Los 5 más rezagados" items={[...statistics.rankedByFrequency].sort((left, right) => right.gap - left.gap).slice(0, 5)} valueLabel="ausencias" valueKey="gap" />
            </section>

            <section className="border border-yellow-500/20 bg-red-950/60 p-6">
              <h2 className="mb-5 text-xl font-black text-yellow-400">Historial exclusivo de Ganadazo</h2>
              <div ref={historyRef} className="h-[400px] overflow-auto">
                <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const draw = draws[virtualItem.index];
                    return (
                      <div
                        key={draw.id}
                        className="absolute left-0 top-0 grid w-full grid-cols-12 items-center border-b border-red-800 px-2 py-3"
                        style={{ height: `${virtualItem.size}px`, transform: `translateY(${virtualItem.start}px)` }}
                      >
                        <div className="col-span-3">
                          <p className="font-bold text-white">#{draw.id}</p>
                          <p className="text-xs text-slate-400">{draw.date}</p>
                        </div>
                        <div className="col-span-6 flex justify-center gap-1 sm:gap-2">
                          {draw.numbers.map((number) => (
                            <span key={number} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-red-700 sm:h-8 sm:w-8">{number}</span>
                          ))}
                        </div>
                        <div className="col-span-3 text-right text-xs font-bold text-yellow-300">
                          {draw.jackpot === null ? '-' : currencyFormatter.format(draw.jackpot)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        <p className="mx-auto max-w-3xl border border-yellow-500/30 bg-red-950/50 px-4 py-3 text-center text-xs text-slate-300">
          Herramienta estadística independiente. Verifica resultados, pozo y condiciones vigentes en la web oficial de Loterías Torito.
        </p>
      </main>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-red-600 bg-red-950/80 p-4 text-center">
      <span className="block text-[10px] font-bold uppercase text-slate-300">{label}</span>
      <strong className="mt-1 block text-2xl text-white">{value}</strong>
      <span className="mt-1 block text-[9px] uppercase text-slate-400">{detail}</span>
    </div>
  );
}

function Ranking({
  title,
  items,
  valueLabel,
  valueKey,
}: {
  title: string;
  items: NumberStat[];
  valueLabel: string;
  valueKey: 'frequency' | 'gap';
}) {
  return (
    <div className="border border-red-800 bg-red-950/60 p-6">
      <h2 className="mb-5 text-lg font-bold text-white">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.number} className="flex items-center justify-between border-b border-red-900 pb-2">
            <span className="font-bold text-white">{index + 1}. Número {item.number}</span>
            <span className="text-sm text-yellow-300">{item[valueKey]} {valueLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}