import type { GstStat } from '../../hooks/useGstDashboardData';
import './GSTStats.css';

interface GSTStatsProps {
  stats: GstStat[];
}

const getIcon = (type: GstStat['iconType']) => {
  switch (type) {
    case 'status':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'returns':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5L20 7" />
          <path d="M5 17l5 5L20 12" />
        </svg>
      );
    case 'due':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'exposure':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="M6 13l3.5 3.5c2 2 5.5 2 7.5 0L19 14.5" />
          <path d="M12 3v18" />
        </svg>
      );
  }
};

export const GSTStats = ({ stats }: GSTStatsProps) => {
  return (
    <div className="gst-stats-grid">
      {stats.map((stat) => (
        <div key={stat.id} className="gst-stat-card">
          <div className="gst-stat-card__header">
            <div className="gst-stat-card__icon">{getIcon(stat.iconType)}</div>
            <span className="gst-stat-card__title">{stat.title}</span>
          </div>
          <div className="gst-stat-card__body">
            <div className="gst-stat-card__value">{stat.value}</div>
            <div className="gst-stat-card__subtitle">{stat.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
