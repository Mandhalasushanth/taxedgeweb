import { useMemo } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { routePaths } from '@core/config'
import { initialsOf } from '@shared/utils'
import { useAppStore, useAuthStore } from '@store/index'
import { navSections } from './navigation'
import { useDashboardSummary } from '@modules/dashboard'
import './DashboardLayout.css'

const SearchIcon = () => (
  <svg className="shell__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const BellIcon = () => (
  <svg className="shell__action-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const ChatIcon = () => (
  <svg className="shell__action-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const GridIcon = () => (
  <svg className="shell__action-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const location = useLocation()
  const { data } = useDashboardSummary()

  const currentLabel = useMemo(() => {
    const items = navSections.flatMap((s) => s.items).filter((i) => !i.to.includes('#'))
    return items.filter((i) => location.pathname === i.to || location.pathname.startsWith(`${i.to}/`)).sort((a, b) => b.to.length - a.to.length)[0]?.label ?? 'Dashboard'
  }, [location.pathname])

  const badges: Partial<Record<'applications' | 'notifications', string>> = {
    applications: data?.brief ? String(data.brief.activeApplications) : undefined,
    notifications: '3',
  }

  const customerCode = user ? `TE-CUS-${user.id.slice(-5).toUpperCase()}` : ''

  return (
    <div className={`shell${isSidebarOpen ? '' : ' shell--collapsed'}`}>
      <aside className="shell__sidebar" aria-label="TaxEdge Dashboard Sidebar">
        <NavLink className="shell__brand" to={routePaths.dashboard}>
          <div className="shell__brand-logo-box">
            <img src="/logo-dark.png" alt="TaxEdge" className="shell__brand-logo-img" />
          </div>
          <div className="shell__brand-text">
            <span className="shell__brand-name">TAX<span className="shell__brand-name-accent">EDGE</span></span>
            <span className="shell__brand-tag">FIN SOLUTIONS</span>
          </div>
        </NavLink>

        <nav className="shell__nav">
          {navSections.map((section) => (
            <div className="shell__nav-section" key={section.title}>
              <p className="shell__nav-title">{section.title}</p>
              {section.items.map((item) =>
                item.to.includes('#') ? (
                  <a key={item.to} href={item.to} className="shell__nav-link">
                    <span className="shell__nav-icon" aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `shell__nav-link${isActive ? ' is-active' : ''}`}>
                    <span className="shell__nav-icon" aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badgeKey && badges[item.badgeKey] && (
                      <span className="shell__nav-badge">{badges[item.badgeKey]}</span>
                    )}
                  </NavLink>
                ),
              )}
            </div>
          ))}
        </nav>

        <div className="shell__sidebar-footer">
          <div className="shell__user">
            <span className="shell__avatar" aria-hidden="true">
              {initialsOf(user?.fullName ?? 'TaxEdge User')}
            </span>
            <div className="shell__user-meta">
              <span className="shell__user-name">{user?.fullName ?? 'Guest'}</span>
              {user && <span className="shell__user-code">{customerCode}</span>}
            </div>
          </div>

          <button className="shell__signout" type="button" onClick={signOut}>
            <span aria-hidden="true">⇥</span> Sign out
          </button>
        </div>
      </aside>

      <div className="shell__main">
        <header className="shell__header">
          <div className="shell__header-left">
            <nav className="shell__breadcrumb" aria-label="Breadcrumb">
              <Link to={routePaths.dashboard}>Home</Link>
              <span className="shell__breadcrumb-sep" aria-hidden="true">→</span>
              <span className="shell__breadcrumb-current">{currentLabel}</span>
            </nav>
          </div>

          <div className="shell__header-actions">
            <label className="shell__search">
              <SearchIcon />
              <input type="search" placeholder="Search applications, documents..." />
            </label>

            <button className="shell__icon-button" type="button" aria-label="Notifications" title="Notifications">
              <BellIcon />
              <span className="shell__icon-dot" aria-hidden="true" />
            </button>

            <NavLink className="shell__icon-button" to={routePaths.chat} aria-label="Chat with support" title="Messages">
              <ChatIcon />
            </NavLink>

            <NavLink className="shell__icon-button" to={routePaths.services} aria-label="All services" title="All Services">
              <GridIcon />
            </NavLink>
          </div>
        </header>

        <main className="shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
