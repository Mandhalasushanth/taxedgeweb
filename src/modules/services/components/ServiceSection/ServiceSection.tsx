import type { ServiceCategoryConfig, ServiceItem } from '../../types/service.types'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import './ServiceSection.css'

export interface ServiceSectionProps {
  config: ServiceCategoryConfig
  services: ServiceItem[]
  onStartService?: (service: ServiceItem) => void
}

export const ServiceSection = ({
  config,
  services,
  onStartService,
}: ServiceSectionProps) => {
  if (services.length === 0) return null

  return (
    <section
      id={`service-section-${config.id}`}
      aria-labelledby={`service-section-title-${config.id}`}
      className="service-section"
    >
      <header className="service-section__header">
        <div className="service-section__header-left">
          <h2 id={`service-section-title-${config.id}`} className="service-section__title">
            {config.title}
          </h2>
          {config.badgeText && (
            <span className="service-section__badge">{config.badgeText}</span>
          )}
        </div>

        <span className="service-section__count-text">
          {services.length} {services.length === 1 ? 'service' : 'services'} available
        </span>
      </header>

      <div className="service-section__grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onStart={onStartService}
          />
        ))}
      </div>
    </section>
  )
}
