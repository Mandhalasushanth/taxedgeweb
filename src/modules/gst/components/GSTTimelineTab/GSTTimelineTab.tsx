import type { GstTimelineEvent } from '../../hooks/useGstMonthlyFilingDetail';
import './GSTTimelineTab.css';

interface GSTTimelineTabProps {
  events: GstTimelineEvent[];
}

export const GSTTimelineTab = ({ events }: GSTTimelineTabProps) => {
  return (
    <div className="gst-timeline-card">
      <div className="gst-timeline-container">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          
          return (
            <div 
              key={event.id} 
              className={`gst-timeline-item gst-timeline-item--${event.status}`}
            >
              {!isLast && <div className="gst-timeline-line"></div>}
              <div className="gst-timeline-dot"></div>
              
              <div className="gst-timeline-content">
                <h3 className="gst-timeline-title">{event.title}</h3>
                {event.description && (
                  <p className="gst-timeline-description">{event.description}</p>
                )}
                <span className="gst-timeline-date">{event.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
