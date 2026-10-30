import React from 'react'
import { SITE } from '../../../shared/site.js'

/**
 * Shows a friendly message instead of a blank page if a component crashes.
 * Give it a `resetKey` (e.g. the pathname) so navigating elsewhere recovers.
 */
class ErrorBoundary extends React.Component {
  state = { error: null, resetKey: this.props.resetKey }

  static getDerivedStateFromError(error) {
    return { error }
  }

  static getDerivedStateFromProps(props, state) {
    return props.resetKey !== state.resetKey ? { error: null, resetKey: props.resetKey } : null
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <section className="section-padding" style={{ textAlign: 'center' }} role="alert">
        <div className="container">
          <h1 style={{ fontSize: 28, marginBottom: 10 }}>Something went wrong</h1>
          <p style={{ marginBottom: 20 }}>
            Please reload the page. If the problem continues, call us on{' '}
            <a href={`tel:${SITE.phones[0].replace(/\s/g, '')}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
              {SITE.phones[0]}
            </a>.
          </p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Reload page</button>
        </div>
      </section>
    )
  }
}

export default ErrorBoundary
