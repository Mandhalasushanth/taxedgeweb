import { useMemo } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { appConfig, routePaths } from '@core/config'
import { initialsOf } from '@shared/utils'
import { useAppStore, useAuthStore } from '@store/index'

import { navSections } from './navigation'
import { useDashboardSummary } from '@modules/dashboard'
import './DashboardLayout.css'

export const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const location = useLocation()
  const { data } = useDashboardSummary()

  const currentLabel = useMemo(() => {
    const items = navSections.flatMap((section) => section.items).filter((item) => !item.to.includes('#'))
    const match = items
      .filter((item) => location.pathname === item.to || location.pathname.startsWith(`${item.to}/`))
      .sort((a, b) => b.to.length - a.to.length)[0]
    return match?.label ?? 'Dashboard'
  }, [location.pathname])

  const badges: Partial<Record<'applications', string>> = {
    applications: data?.brief ? String(data.brief.activeApplications) : undefined,
  }

  const customerCode = user ? `TE-CUS-${user.id.slice(-5).toUpperCase()}` : ''

  return (
    <div className={`shell${isSidebarOpen ? '' : ' shell--collapsed'}`}>
      <aside className="shell__sidebar">
        <NavLink className="shell__brand" to={routePaths.dashboard}>
          <span className="shell__brand-mark" aria-hidden="true">
            {initialsOf(appConfig.name).slice(0, 2)}
          </span>
          <span className="shell__brand-text">
            <span className="shell__brand-name">{appConfig.name}</span>
            <span className="shell__brand-tag">Fin Solutions</span>
          </span>
        </NavLink>

        <nav className="shell__nav">
          {navSections.map((section) => (
            <div className="shell__nav-section" key={section.title}>
              <p className="shell__nav-title">{section.title}</p>
              {section.items.map((item) =>
                item.to.includes('#') ? (
                  <a key={item.to} href={item.to} className="shell__nav-link">
                    <span className="shell__nav-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `shell__nav-link${isActive ? ' is-active' : ''}`}
                  >
                    <span className="shell__nav-icon" aria-hidden="true">
                      {item.icon}
                    </span>
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
            <span className="shell__user-meta">
              <span className="shell__user-name">{user?.fullName ?? 'Guest'}</span>
              {user && <span className="shell__user-code">{customerCode}</span>}
            </span>
          </div>

          <button className="shell__signout" type="button" onClick={signOut}>
            <span aria-hidden="true">⇥</span> Sign out
          </button>
        </div>
      </aside>

      <div className="shell__main">
        <header className="shell__header">
          <div className="shell__header-left">
            <button
              className="shell__icon-button"
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              ☰
            </button>

            <nav className="shell__breadcrumb" aria-label="Breadcrumb">
              <Link to={routePaths.dashboard}>Home</Link>
              <span className="shell__breadcrumb-sep" aria-hidden="true">
                →
              </span>
              <span className="shell__breadcrumb-current">{currentLabel}</span>
            </nav>
          </div>

          <div className="shell__header-actions">
            <label className="shell__search">
              <span aria-hidden="true">🔍</span>
              <input type="search" placeholder="Search applications, documents…" />
            </label>

            <button className="shell__icon-button" type="button" aria-label="Notifications">
              🔔<span className="shell__icon-dot" aria-hidden="true" />
            </button>

            <NavLink className="shell__icon-button" to={routePaths.chat} aria-label="Chat with support">
              💬
            </NavLink>

            <a className="shell__icon-button" href={`${routePaths.dashboard}#quick-services`} aria-label="All services">
              ▦
            </a>
          </div>
        </header>

        <main className="shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
