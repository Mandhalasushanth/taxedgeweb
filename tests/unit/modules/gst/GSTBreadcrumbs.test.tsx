import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DashboardLayout } from '@app/layouts/DashboardLayout'
import { GSTFiling } from '@modules/gst/pages/GSTFiling/GSTFiling'

describe('GST Navbar Breadcrumb Navigation', () => {
  it('renders GST -> Filing -> Period in DashboardLayout at /gst/filing', () => {
    render(
      <MemoryRouter initialEntries={['/gst/filing']}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="gst/filing" element={<GSTFiling />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const breadcrumb = screen.getByLabelText('Breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
    expect(breadcrumb).toHaveTextContent('GST')
    expect(breadcrumb).toHaveTextContent('Filing')
    expect(breadcrumb).toHaveTextContent('Period')
  })

  it('renders GST -> Filing -> Documents in DashboardLayout at /gst/file-upload', () => {
    render(
      <MemoryRouter initialEntries={['/gst/file-upload']}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="gst/file-upload" element={<GSTFiling />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const breadcrumb = screen.getByLabelText('Breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
    expect(breadcrumb).toHaveTextContent('GST')
    expect(breadcrumb).toHaveTextContent('Filing')
    expect(breadcrumb).toHaveTextContent('Documents')
  })

  it('does NOT render duplicate in-page breadcrumbs inside GSTFiling', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/gst/file-upload']}>
        <GSTFiling />
      </MemoryRouter>
    )

    const inPageBreadcrumbs = container.querySelector('.gst-filing-breadcrumb')
    expect(inPageBreadcrumbs).toBeNull()
  })
})
