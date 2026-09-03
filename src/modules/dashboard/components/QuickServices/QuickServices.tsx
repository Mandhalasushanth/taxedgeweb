import { Link } from 'react-router-dom'

import type { QuickService } from '../../types/dashboard.types'
import './QuickServices.css'

export interface QuickServicesProps {
  services: QuickService[]
}

export const QuickServices = ({ services }: QuickServicesProps) => (
  <section className="quick-services" id="quick-services">
    <h2 className="quick-services__title">Start something</h2>
    <div className="quick-services__grid">
      {services.map((service) => (
        <Link className="quick-service" key={service.id} to={service.to}>
          <span className="quick-service__icon" aria-hidden="true">
            {service.icon}
          </span>
          <span className="quick-service__label">{service.label}</span>
          <span className="quick-service__description">{service.description}</span>
        </Link>
      ))}
    </div>
  </section>
)
