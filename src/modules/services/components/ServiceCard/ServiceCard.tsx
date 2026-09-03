import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ServiceItem } from '../../types/service.types'
import './ServiceCard.css'

export interface ServiceCardProps {
  service: ServiceItem
  onStart?: (service: ServiceItem) => void
}

const renderServiceIcon = (iconType: string): ReactNode => {
  switch (iconType) {
    case 'gst-reg':
    case 'gst-file':
    case 'gst-comp':
    case 'gst-amend':
    case 'gst-cancel':
    case 'gst-return':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    case 'itr-file':
    case 'tax-plan':
    case 'tds-return':
    case 'form-16':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__icon">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    case 'loan-personal':
    case 'loan-business':
    case 'loan-home':
    case 'loan-property':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__icon">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    case 'biz-reg':
    case 'biz-msme':
    case 'biz-partner':
    case 'biz-comp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__icon">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9h1" />
          <path d="M9 13h1" />
          <path d="M9 17h1" />
        </svg>
      )
    case 'ins-health':
    case 'ins-life':
    case 'ins-biz':
    case 'ins-vehicle':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__icon">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
  }
}

export const ServiceCard = ({ service, onStart }: ServiceCardProps) => {
  const navigate = useNavigate()

  const handleStart = () => {
    if (onStart) {
      onStart(service)
    } else if (service.route) {
      navigate(service.route)
    }
  }

  return (
    <article className="service-card">
      <div>
        <div className="service-card__top">
          <div className="service-card__icon-box" aria-hidden="true">
            {renderServiceIcon(service.iconType)}
          </div>
          {service.badge && <span className="service-card__badge">{service.badge}</span>}
        </div>

        <div className="service-card__body">
          <h3 className="service-card__title">{service.title}</h3>
          <p className="service-card__desc">{service.description}</p>
        </div>
      </div>

      <div>
        <hr className="service-card__divider" />

        <div className="service-card__meta-row">
          <div className="service-card__pricing">
            <span className="service-card__price">{service.price}</span>
            <span className="service-card__pricing-type">{service.pricingType}</span>
          </div>

          <div className="service-card__turnaround" title={`Turnaround time: ${service.turnaround}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-card__clock-icon" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{service.turnaround}</span>
          </div>
        </div>

        <button
          type="button"
          className="service-card__btn"
          onClick={handleStart}
          aria-label={`Start ${service.title}`}
        >
          <span>Start</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="service-card__btn-arrow" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </article>
  )
}
