type LotteryId = 'torito-millon' | 'torito-ganadazo';

interface LotteryTabsProps {
  activeLottery: LotteryId;
}

const tabs = [
  { id: 'torito-millon' as const, label: 'Torito 1 Millón', href: '/' },
  { id: 'torito-ganadazo' as const, label: 'Torito Ganadazo', href: '/torito-ganadazo' },
];

export default function LotteryTabs({ activeLottery }: LotteryTabsProps) {
  return (
    <nav aria-label="Seleccionar lotería" className="flex rounded-lg border border-red-700 bg-red-950/70 p-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeLottery;

        return (
          <a
            key={tab.id}
            href={tab.href}
            aria-current={isActive ? 'page' : undefined}
            className={`px-3 py-2 text-center text-xs font-bold transition-colors sm:text-sm ${
              isActive
                ? 'bg-yellow-400 text-red-950 shadow-sm'
                : 'text-slate-300 hover:bg-red-900 hover:text-white'
            }`}
          >
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}