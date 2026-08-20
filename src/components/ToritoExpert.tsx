import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const Sparkles = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const BrainCircuit = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .26 3.01A2.5 2.5 0 0 0 3 14a2.5 2.5 0 0 0 1.22 2.15 2.5 2.5 0 0 0 2.22 2.23 2.5 2.5 0 0 0 2.53 1.13A2.5 2.5 0 0 0 12 18.5a2.5 2.5 0 0 0 3.03.99 2.5 2.5 0 0 0 2.53-1.13A2.5 2.5 0 0 0 19.78 16.15 2.5 2.5 0 0 0 21 14a2.5 2.5 0 0 0-1-2.01 2.5 2.5 0 0 0 .26-3.01 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5Z"/><path d="M12 8.5v6"/></svg>
);
const Flame = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
);
const Snowflake = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 20-4-4"/><path d="m4 4 4 4"/><path d="m4 20 4-4"/><path d="m20 4-4 4"/></svg>
);
const Scale = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
);
const Github = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76a5.5 5.5 0 0 0-1.5-3.8c.15-.38.65-1.8-.15-3.8 0 0-1.2-.38-3.9 1.45a13.3 13.3 0 0 0-7 0C6.2 1.62 5 2 5 2c-.8 2-.3 3.42-.15 3.8A5.5 5.5 0 0 0 3.35 9.6c0 5.26 3 6.46 6 6.76-.7.62-1 1.5-1 2.5v4"/><path d="M7 20c-3.1 1-5-1-5-3"/></svg>
);
const RefreshCw = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);
const Info = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const Zap = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

type PredictionType = 'balanced' | 'hot' | 'overdue';
interface PredictionResult {
  numbers: number[];
  type: PredictionType;
  stats: {
    sum: number;
    oddEven: string; 
    hotCount: number;
    coldCount: number;
  }
}

interface DrawRecord {
  numbers: number[];
  date: string;
  id: string;
}

export default function ToritoExpert() {
  const [draws, setDraws] = useState<DrawRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<PredictionType>('balanced');
  
  const parentRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    const processData = (data: any[]) => {
      const formattedDraws: DrawRecord[] = data.map((item) => {
        return {
           id: item.id.toString(),
           date: item.f,
           numbers: [...item.n]
        };
      });
      setDraws(formattedDraws);
      setPrediction(null);
      setError(null);
    };

    fetch('https://xsuerte-landing-zone-prod.s3.us-east-1.amazonaws.com/latest/torito.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(processData)
      .catch(err => {
        console.warn('S3 fetch failed, falling back to local data:', err);
        // Fallback to local data
        fetch('/data/torito.json')
          .then(res => {
            if (!res.ok) throw new Error('Local fallback failed');
            return res.json();
          })
          .then(processData)
          .catch(fallbackErr => {
            console.error('Error fetching data (including fallback):', fallbackErr);
            setError('Error al cargar la base de datos de sorteos.');
          });
      });
  }, []);

  const virtualizer = useVirtualizer({
    count: draws.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  });

  const statistics = useMemo(() => {
    if (draws.length === 0) return null;

    const frequency: Record<number, number> = {};
    const lastSeenIndex: Record<number, number> = {}; 
    const totalDraws = draws.length;

    draws.forEach((draw, index) => {
      draw.numbers.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
        lastSeenIndex[val] = index; 
      });
    });

    const gap: Record<number, number> = {};
    for (let i = 1; i <= 42; i++) {
      gap[i] = lastSeenIndex[i] !== undefined ? (totalDraws - 1 - lastSeenIndex[i]) : totalDraws;
    }

    const sortedNums = Object.entries(frequency)
      .map(([numStr, count]) => {
        const num = parseInt(numStr, 10);
        return { num, count, gap: gap[num] };
      })
      .sort((a, b) => b.count - a.count); 

    const hotNumbers = sortedNums.slice(0, 15).map(x => x.num); 
    const coldNumbers = [...sortedNums].sort((a, b) => b.gap - a.gap).slice(0, 15).map(x => x.num);

    const topHot = sortedNums.slice(0, 5);
    const topRezagados = [...sortedNums].sort((a, b) => b.gap - a.gap).slice(0, 5);

    const historyStrings = new Set<string>();
    draws.forEach(d => {
      const sorted6 = [...d.numbers].sort((a, b) => a - b);
      if (sorted6.length === 6) {
        historyStrings.add(sorted6.join(','));
      }
    });

    const lastDraw = draws.length > 0 ? [...draws[0].numbers] : [];

    return {
      frequency,
      gap,
      sortedNums,
      totalDraws,
      hotNumbers,
      coldNumbers,
      topHot,
      topRezagados,
      historyStrings,
      lastDraw
    };
  }, [draws]);

  const generatePrediction = () => {
    if (!statistics) return;
    setLoading(true);
    
    setTimeout(() => {
        const { hotNumbers, coldNumbers } = statistics;
        let bestCombination: number[] | null = null;
        let bestScore = -Infinity;
        let attempts = 0;
        const MAX_ATTEMPTS = 5000;
        
        while (attempts < MAX_ATTEMPTS) {
            attempts++;
            const candidate = generateCandidate(statistics, selectedStrategy);
            const score = evaluateCandidate(candidate, statistics, selectedStrategy);
            
            // Historical Clone Filter
            const sortedCandidate = [...candidate].sort((a, b) => a - b);
            const candidateStr = sortedCandidate.join(',');
            if (statistics.historyStrings.has(candidateStr)) {
                continue; 
            }

            if (score > bestScore) {
                bestScore = score;
                bestCombination = candidate;
            }
            
            if (bestScore >= 0.95) break; 
        }

        if (!bestCombination) {
             setLoading(false);
             return;
        }

        const sorted = [...bestCombination].sort((a, b) => a - b);
        
        const sum = sorted.reduce((a, b) => a + b, 0);
        const odds = sorted.filter(n => n % 2 !== 0).length;
        const evens = sorted.length - odds;
        const hotCount = sorted.filter(n => hotNumbers.includes(n)).length;
        const coldCount = sorted.filter(n => coldNumbers.includes(n)).length;

        setPrediction({
            numbers: sorted,
            type: selectedStrategy,
            stats: {
                sum,
                oddEven: `${odds}/${evens}`,
                hotCount,
                coldCount
            }
        });
        setLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (statistics && !initialLoadDone.current) {
        initialLoadDone.current = true;
        generatePrediction();
    }
  }, [statistics]);

  const generateCandidate = (stats: any, strategy: PredictionType): number[] => {
    const pool: number[] = [];
    const { frequency, gap } = stats;

    const maxCount = stats.sortedNums[0]?.count || 1;

    for (let i = 1; i <= 42; i++) {
        let weight = 1;
        const freqScore = (frequency[i] || 0) / maxCount;
        const gapScore = Math.min((gap[i] || 0), 100) / 100; 

        if (strategy === 'hot') {
            weight += freqScore * 20; 
        } else if (strategy === 'overdue') {
            weight += gapScore * 25;  
        } else { // Balanced
            weight += freqScore * 5;
            weight += gapScore * 5;
        }

        const entries = Math.max(1, Math.floor(weight * 10));
        for (let k = 0; k < entries; k++) pool.push(i);
    }

    const selection = new Set<number>();
    while (selection.size < 6) {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        selection.add(pick);
    }
    
    return Array.from(selection);
  };

  const evaluateCandidate = (candidate: number[], stats: any, strategy: PredictionType): number => {
      const numbers = candidate;
      const sum = numbers.reduce((a, b) => a + b, 0);
      const odds = numbers.filter(n => n % 2 !== 0).length;
      
      // 1. FILTRO DE SUMA ESTRICTO para 42 números (Media aprox 129, rango ideal: 100 a 155)
      if (sum < 80 || sum > 180) return -1; 
      let sumBonus = 0;
      if (sum >= 100 && sum <= 155) sumBonus = 0.15; 

      // 2. FILTRO PAR/IMPAR
      if (odds === 0 || odds === 6) return -1; 
      let oddEvenBonus = 0;
      if (odds === 3) oddEvenBonus = 0.15;
      else if (odds === 2 || odds === 4) oddEvenBonus = 0.05;

      // 3. FILTRO DE CONSECUTIVOS
      const sorted = [...numbers].sort((a,b) => a-b);
      let consecutives = 0;
      for(let i=0; i<sorted.length-1; i++) {
          if (sorted[i+1] === sorted[i]+1) consecutives++;
      }
      if (consecutives > 2) return -1; 

      // 4. FILTRO DE DÉCADAS (Evitar 4 o más números en la misma decena)
      const decades = [0, 0, 0, 0, 0];
      numbers.forEach(n => {
          if (n < 10) decades[0]++;
          else if (n < 20) decades[1]++;
          else if (n < 30) decades[2]++;
          else if (n < 40) decades[3]++;
          else decades[4]++;
      });
      if (decades.some(d => d >= 4)) return -1;

      // 5. FILTRO DE INTERSECCIÓN CON SORTEO ANTERIOR
      let lastDrawBonus = 0;
      if (stats.lastDraw && stats.lastDraw.length > 0) {
          const overlap = numbers.filter(n => stats.lastDraw.includes(n)).length;
          if (overlap === 1) lastDrawBonus = 0.15; 
          else if (overlap > 2) return -1; 
      }

      // 6. SCORE ESTRATÉGICO
      let strategyScore = 0;
      const hotCount = numbers.filter(n => stats.hotNumbers.includes(n)).length;
      const coldCount = numbers.filter(n => stats.coldNumbers.includes(n)).length;
      
      if (strategy === 'hot') {
          strategyScore = (hotCount / 6) * 0.55; 
      } else if (strategy === 'overdue') {
          strategyScore = (coldCount / 6) * 0.55;
      } else { 
          if (hotCount >= 2 && hotCount <= 3 && coldCount >= 1 && coldCount <= 2) {
              strategyScore = 0.55; 
          } else {
              strategyScore = 0.2;
          }
      }

      return sumBonus + oddEvenBonus + lastDrawBonus + strategyScore; 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-900 to-red-950 text-slate-200 font-sans pb-12 selection:bg-yellow-500/30">
      {/* Header Premium */}
      <header className="bg-red-800/80 border-b border-yellow-500/30 sticky top-0 z-50 backdrop-blur-md shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">
              <Sparkles className="text-red-900 w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter italic">
                TORITO<span className="text-yellow-400">EXPERT</span>
              </h1>
              <p className="text-[10px] text-yellow-400/80 uppercase tracking-[0.2em] font-bold -mt-1">IA Predictiva Torito 1 Millón</p>
            </div>
          </div>
          {draws.length > 0 && (
             <div className="flex items-center gap-3 bg-red-900/50 px-4 py-2 rounded-full border border-red-800 shadow-inner">
                <div className="flex items-center gap-6">
                    <a href="/como-funciona" className="text-sm font-semibold text-slate-300 hover:text-yellow-400 transition-colors flex items-center gap-2">
                        <Info size={16} /> <span className="hidden sm:inline">¿Cómo funciona la IA?</span>
                    </a>
                    <a href="https://github.com/joanperamasc/fe_torito_expert_ai" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors relative group">
                        <Github size={20} />
                        <span className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-slate-800 text-xs font-medium text-slate-200 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-slate-700">
                            Ver código en GitHub
                        </span>
                    </a>
                    <div className="hidden sm:flex flex-col items-end border-l border-red-700 pl-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-sm font-bold text-slate-200">
                                <span className="text-white">{draws.length}</span> Sorteos Procesados
                            </span>
                        </div>
                        {draws.length > 0 && (
                            <span className="text-xs text-slate-400 mt-1">
                                Último Sorteo: <span className="text-yellow-400 font-semibold">{draws[0].date}</span>
                            </span>
                        )}
                    </div>
                </div>
             </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        
        {/* Pantalla de Carga de Archivo */}
        {!draws.length && !error && (
          <div className="text-center py-32 px-4 flex flex-col items-center justify-center space-y-6">
             <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
             <h2 className="text-2xl font-bold text-slate-300">Cargando y procesando la matriz histórica...</h2>
          </div>
        )}
        {error && (
            <div className="text-center py-32 px-4">
                 <div className="inline-flex items-center gap-2 bg-red-950/50 border border-red-900/50 text-red-400 font-bold py-4 px-6 rounded-2xl">
                     <Info size={24}/> {error}
                 </div>
            </div>
        )}

        {/* Dashboard Principal */}
        {draws.length > 0 && statistics && (
          <div className="space-y-6">
            {/* Banner de Estrategia */}
            <div className="bg-gradient-to-r from-red-600/60 to-red-900/40 border border-yellow-400/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-start sm:items-center gap-4">
                    <div className="bg-yellow-500/20 p-2 rounded-xl text-xl shrink-0">⭐</div>
                    <div>
                        <h4 className="text-yellow-400 font-bold text-sm sm:text-base">Aplica la Estrategia del "Ticket Perfecto"</h4>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1">Descubre cómo combinar 4 jugadas para cubrir todos los escenarios probabilísticos.</p>
                    </div>
                </div>
                <a href="/como-funciona" className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-red-950 text-xs sm:text-sm font-bold py-2 px-5 rounded-xl transition-all shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:scale-105 block text-center w-full sm:w-auto">
                    Leer Guía
                </a>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
            
            <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-red-950/60 backdrop-blur rounded-3xl p-6 border border-yellow-500/20 shadow-2xl">
                    <h3 className="text-yellow-400 font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                        <BrainCircuit size={18}/> Modelo Neuronal
                    </h3>
                    
                    <div className="space-y-4">
                        <button 
                            onClick={() => setSelectedStrategy('balanced')}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${selectedStrategy === 'balanced' ? 'bg-yellow-500/20 border-yellow-400' : 'bg-red-950/80 border-red-800 hover:border-red-600'}`}
                        >
                            <div className={`p-2.5 rounded-xl shrink-0 ${selectedStrategy === 'balanced' ? 'bg-yellow-400 text-red-900 shadow-lg shadow-yellow-500/20' : 'bg-red-900 text-red-300'}`}>
                                <Scale size={20}/>
                            </div>
                            <div>
                                <span className={`font-black text-lg block mb-1 ${selectedStrategy === 'balanced' ? 'text-yellow-400' : 'text-slate-300'}`}>Equilibrada</span>
                                <span className="text-xs text-slate-400 font-medium leading-relaxed">Balance perfecto entre sumas (100-155), pares/impares y ley del tercio. <strong className="text-slate-200">Recomendado.</strong></span>
                            </div>
                        </button>

                        <button 
                            onClick={() => setSelectedStrategy('hot')}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${selectedStrategy === 'hot' ? 'bg-red-500/20 border-red-500' : 'bg-red-950/80 border-red-800 hover:border-red-600'}`}
                        >
                            <div className={`p-2.5 rounded-xl shrink-0 ${selectedStrategy === 'hot' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-red-900 text-red-300'}`}>
                                <Flame size={20}/>
                            </div>
                            <div>
                                <span className={`font-black text-lg block mb-1 ${selectedStrategy === 'hot' ? 'text-red-400' : 'text-slate-300'}`}>La Racha</span>
                                <span className="text-xs text-slate-400 font-medium leading-relaxed">Agrupa los números "calientes" que están repitiéndose constantemente en los últimos meses.</span>
                            </div>
                        </button>

                        <button 
                            onClick={() => setSelectedStrategy('overdue')}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${selectedStrategy === 'overdue' ? 'bg-blue-500/20 border-blue-500' : 'bg-red-950/80 border-red-800 hover:border-red-600'}`}
                        >
                            <div className={`p-2.5 rounded-xl shrink-0 ${selectedStrategy === 'overdue' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-red-900 text-red-300'}`}>
                                <Snowflake size={20}/>
                            </div>
                            <div>
                                <span className={`font-black text-lg block mb-1 ${selectedStrategy === 'overdue' ? 'text-blue-400' : 'text-slate-300'}`}>El Golpe</span>
                                <span className="text-xs text-slate-400 font-medium leading-relaxed">Persigue los números rezagados ("fríos"). La teoría de reversión a la media: si no sale, ya le toca.</span>
                            </div>
                        </button>
                    </div>

                    <button 
                        onClick={generatePrediction}
                        disabled={loading}
                        className="w-full mt-8 py-5 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-200 hover:to-yellow-400 text-red-950 font-black text-xl rounded-2xl shadow-[0_10px_20px_rgba(250,204,21,0.2)] hover:shadow-[0_10px_30px_rgba(250,204,21,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {loading ? <RefreshCw className="animate-spin text-red-900" size={24}/> : <Sparkles className="fill-red-900 text-red-900" size={24}/>}
                        {loading ? 'CALCULANDO MATRIZ...' : 'GENERAR JUGADA'}
                    </button>
                </div>

                <div className="bg-red-950/50 rounded-3xl p-6 border border-red-800 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-slate-700 opacity-20">
                        <Zap size={100} />
                    </div>
                    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-5 relative z-10">Visor del Historial</h3>
                    
                    <div className="space-y-4 relative z-10">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-slate-300 text-sm font-medium flex items-center gap-2"><Flame size={14} className="text-red-400"/> Top Caliente</span>
                                <span className="text-red-400 font-black text-xl">{statistics.hotNumbers[0]}</span>
                            </div>
                            <div className="w-full bg-red-900 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" style={{width: '90%'}}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-slate-300 text-sm font-medium flex items-center gap-2"><Snowflake size={14} className="text-blue-400"/> Top Rezagado</span>
                                <span className="text-blue-400 font-black text-xl">{statistics.coldNumbers[0]}</span>
                            </div>
                            <div className="w-full bg-red-900 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full" style={{width: '100%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8">
                <div className="h-full bg-gradient-to-b from-red-600 to-red-800 rounded-3xl p-8 lg:p-12 border-4 border-yellow-400 relative overflow-hidden flex flex-col items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                    
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none"></div>

                    {prediction ? (
                        <div className="relative z-10 w-full animate-in zoom-in-95 fade-in duration-500">
                            
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-4 shadow-sm">
                                    <div className={`w-2 h-2 rounded-full ${prediction.type === 'balanced' ? 'bg-yellow-400' : prediction.type === 'hot' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                                        Filtro: {prediction.type === 'balanced' ? 'Equilibrio Óptimo' : prediction.type === 'hot' ? 'Tendencia Activa' : 'Reversión a la Media'}
                                    </span>
                                </div>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
                                    TU COMBINACIÓN
                                </h2>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-16">
                                {prediction.numbers.map((num, i) => (
                                    <div key={i} className="group relative">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-yellow-400 transform transition-transform duration-300 group-hover:-translate-y-3 cursor-default">
                                            <span className="text-red-700 font-black text-3xl sm:text-4xl lg:text-5xl drop-shadow-sm">
                                                {num}
                                            </span>
                                        </div>
                                        <div className="w-10 h-2 bg-black/40 rounded-full mx-auto mt-3 blur-sm group-hover:scale-75 group-hover:opacity-50 transition-all duration-300"></div>
                                        
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg border border-slate-700 whitespace-nowrap shadow-xl pointer-events-none">
                                            Histórico total: <strong>{statistics.frequency[num] || 0}</strong> veces
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                                <div className="bg-red-950/80 p-4 rounded-2xl border border-red-700 text-center shadow-inner">
                                    <span className="text-slate-300 text-[10px] uppercase font-bold tracking-widest block mb-2">Suma Total</span>
                                    <span className={`text-2xl font-black block ${prediction.stats.sum >= 100 && prediction.stats.sum <= 155 ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {prediction.stats.sum}
                                    </span>
                                    <span className="text-[9px] text-slate-400 uppercase mt-1 block">Rango ideal: 100-155</span>
                                </div>
                                <div className="bg-red-950/80 p-4 rounded-2xl border border-red-700 text-center shadow-inner">
                                    <span className="text-slate-300 text-[10px] uppercase font-bold tracking-widest block mb-2">Impar/Par</span>
                                    <span className="text-2xl font-black text-white block">
                                        {prediction.stats.oddEven}
                                    </span>
                                    <span className="text-[9px] text-slate-400 uppercase mt-1 block">Ideal: 3/3 o 4/2</span>
                                </div>
                                <div className="bg-red-950/80 p-4 rounded-2xl border border-red-700 text-center shadow-inner">
                                    <span className="text-slate-300 text-[10px] uppercase font-bold tracking-widest block mb-2">Núm. Calientes</span>
                                    <span className="text-2xl font-black text-red-400 block">
                                        {prediction.stats.hotCount}<span className="text-sm text-slate-400">/6</span>
                                    </span>
                                    <span className="text-[9px] text-slate-400 uppercase mt-1 block">Top 15 Frecuentes</span>
                                </div>
                                <div className="bg-red-950/80 p-4 rounded-2xl border border-red-700 text-center shadow-inner">
                                    <span className="text-slate-300 text-[10px] uppercase font-bold tracking-widest block mb-2">Núm. Fríos</span>
                                    <span className="text-2xl font-black text-blue-400 block">
                                        {prediction.stats.coldCount}<span className="text-sm text-slate-400">/6</span>
                                    </span>
                                    <span className="text-[9px] text-slate-400 uppercase mt-1 block">Top 15 Rezagados</span>
                                </div>
                            </div>
                            
                        </div>
                    ) : (
                        <div className="text-center relative z-10">
                            <div className="w-24 h-24 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-yellow-400/50 shadow-inner">
                                <BrainCircuit size={40} className="text-yellow-400"/>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-200 mb-2">IA en espera</h3>
                            <p className="text-slate-400 max-w-sm mx-auto">Selecciona una estrategia en el panel izquierdo y presiona "Generar Jugada" para obtener tus números.</p>
                        </div>
                    )}
                </div>
            </div>
            </div>

            {/* Panel de Métricas Top */}
            {statistics && (
              <div className="mt-12 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                
                {/* Top Calientes */}
                <div className="bg-red-950/60 backdrop-blur rounded-3xl p-6 border border-red-800 shadow-2xl">
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <Flame className="text-red-500" /> Los 5 Más Calientes
                  </h3>
                  <div className="space-y-4">
                    {statistics.topHot.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-slate-500 font-black text-sm w-4">{idx + 1}.</span>
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white shadow-inner">
                            {item.num}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-yellow-400">{item.count}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">veces</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Rezagados */}
                <div className="bg-red-950/60 backdrop-blur rounded-3xl p-6 border border-red-800 shadow-2xl">
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <Snowflake className="text-blue-500" /> Los 5 Más Rezagados
                  </h3>
                  <div className="space-y-4">
                    {statistics.topRezagados.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-slate-500 font-black text-sm w-4">{idx + 1}.</span>
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white shadow-inner">
                            {item.num}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-400">{item.gap}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">ausencias</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tabla Virtualizada del Historial */}
            <div className="mt-12 lg:col-span-12 bg-red-950/60 backdrop-blur rounded-3xl p-6 border border-yellow-500/20 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h3 className="text-yellow-400 font-black text-xl tracking-tighter mb-6 flex items-center gap-2">
                    <Zap size={24}/> Historial de Sorteos Procesados
                </h3>
                
                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-800 text-slate-400 font-bold text-sm uppercase tracking-wider px-4">
                    <div className="col-span-4 text-left">Sorteo / Fecha</div>
                    <div className="col-span-8 text-center">Jugada Ganadora</div>
                </div>

                <div 
                    ref={parentRef}
                    className="h-[400px] overflow-auto mt-4 pr-2"
                >
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {virtualizer.getVirtualItems().map((virtualItem) => {
                            const draw = draws[virtualItem.index];
                            const mainBalls = draw.numbers.slice(0, 6);

                            return (
                                <div
                                    key={virtualItem.key}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualItem.size}px`,
                                        transform: `translateY(${virtualItem.start}px)`,
                                    }}
                                    className="px-4 hover:bg-slate-800/50 transition-colors rounded-xl flex items-center"
                                >
                                    <div className="grid grid-cols-12 gap-4 w-full items-center py-3 border-b border-slate-800/50">
                                        <div className="col-span-4 text-left">
                                            <div className="text-white font-bold">#{draw.id}</div>
                                            <div className="text-slate-500 text-xs">{draw.date}</div>
                                        </div>
                                        
                                        <div className="col-span-8 flex justify-center gap-1.5 sm:gap-2">
                                            {mainBalls.map((num, i) => (
                                                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-red-700 font-bold text-xs sm:text-sm flex items-center justify-center border-2 border-slate-200 shadow-sm">
                                                    {num}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}