export interface Stat {
  label: string;
  value: number;
}

export interface StatsGridProps {
  stats: Stat[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => (
  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat) => (
      <div key={stat.label} className="stat-card">
        <h3>{stat.label}</h3>
        <p>{stat.value}</p>
      </div>
    ))}
  </div>
);
