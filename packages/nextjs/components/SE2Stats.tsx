import { CodeBracketIcon, StarIcon } from "@heroicons/react/24/outline";

export type SE2StatsData = {
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
};

type StatItemProps = {
  value: number | null;
  label: string;
  icon: React.ReactNode;
};

const formatNumber = (num: number | null): string => {
  if (num === null) return "-";
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k+`;
  }
  return num.toString();
};

const StatItem = ({ value, label, icon }: StatItemProps) => (
  <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 py-3 sm:py-4 px-1.5 sm:px-3">
    <div className="flex items-center gap-1 sm:gap-2">
      <span className="text-primary/70">{icon}</span>
      <span className="text-lg sm:text-2xl font-bold text-base-content">{formatNumber(value)}</span>
    </div>
    <span className="text-[9px] sm:text-[11px] text-base-content/60 font-medium uppercase tracking-wider">{label}</span>
  </div>
);

const ForkIcon = () => (
  <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 5a2 2 0 100-4 2 2 0 000 4zM7 21a2 2 0 100-4 2 2 0 000 4zM17 9a2 2 0 100-4 2 2 0 000 4zM7 5v12M7 17c0-4 10-4 10-10" />
  </svg>
);

export const SE2Stats = ({ stats }: { stats: SE2StatsData | null }) => {
  return (
    <div className={`w-full max-w-xl mx-auto -mt-36 lg:-mt-[34rem] mb-12 lg:mb-20`}>
      <p className="text-lg font-light text-center mb-3 tracking-wide">Trusted by a big community of builders</p>
      <a href="http://projects.scaffoldeth.io/" target="_blank" rel="noopener noreferrer" className="block group">
        <div className="bg-base-100/80 backdrop-blur-sm border border-base-300/60 rounded-2xl shadow-sm hover:shadow-md hover:border-base-300 transition-all duration-300">
          {/* Stats grid with dividers */}
          <div className="grid grid-cols-3 divide-x divide-base-300/50">
            <StatItem
              value={stats?.totalRepositories ?? null}
              label="Projects Built"
              icon={<CodeBracketIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
            <StatItem
              value={stats?.totalStars ?? null}
              label="GitHub Stars"
              icon={<StarIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            />
            <StatItem value={stats?.totalForks ?? null} label="Forks" icon={<ForkIcon />} />
          </div>
          {/* Footer link */}
          <div className="border-t border-base-300/50 py-2 text-center">
            <span className="text-xs text-base-content/50 group-hover:text-primary transition-colors">
              View all projects →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};
