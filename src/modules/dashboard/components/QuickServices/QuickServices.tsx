import { Link } from 'react-router-dom'

import type { QuickService } from '../../types/dashboard.types'
import './QuickServices.css'

export interface QuickServicesProps {
  services: QuickService[]
}

export const QuickServices = ({ services }: QuickServicesProps) => (
  <section className="quick-services" id="quick-services">
    <div className="quick-services__grid">
      {services.map((service) => (
        <Link className="quick-service" key={service.id} to={service.to}>
          <div className="quick-service__icon-wrap">
            <span className="quick-service__icon" aria-hidden="true">
              {service.icon}
            </span>
          </div>

          <h3 className="quick-service__label">{service.label}</h3>
          <p className="quick-service__description">{service.description}</p>

          <div className="quick-service__footer">
            <div className="quick-service__price-wrap">
              <span className="quick-service__price">{service.price}</span>
              {service.priceUnit && (
                <span className="quick-service__price-unit">{service.priceUnit}</span>
              )}
            </div>
            <span className="quick-service__action">
              Open <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
)
