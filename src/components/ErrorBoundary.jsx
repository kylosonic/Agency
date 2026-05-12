import { Component } from 'react';
import IconGlyph from './IconGlyph';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary-fallback">
          <div className="container">
            <div className="error-boundary-card glass-card">
              <span className="error-boundary-icon" aria-hidden="true">
                <IconGlyph name="alert" size={32} />
              </span>
              <h1>Something went wrong</h1>
              <p>
                An unexpected error occurred while loading this page. Our team
                has been notified.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleReset}
              >
                Return to Home
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
