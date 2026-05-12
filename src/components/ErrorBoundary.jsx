import { Component } from 'react';
import IconGlyph from './IconGlyph';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorId: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
    this.setState({ errorId: Date.now().toString(36) });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorId: null });
  };

  handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/');
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary-fallback" role="alert" aria-live="assertive">
          <div className="container">
            <div className="error-boundary-card glass-card">
              <span className="error-boundary-icon" aria-hidden="true">
                <IconGlyph name="alert" size={32} />
              </span>
              <h1>Something went wrong</h1>
              <p>
                An unexpected error occurred while loading this view. You can retry immediately or return home.
              </p>
              {this.state.errorId ? (
                <p className="error-boundary-meta">Reference: {this.state.errorId}</p>
              ) : null}
              <div className="error-boundary-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleRetry}
                >
                  Try Again
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleGoHome}
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
