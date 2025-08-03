import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Check if this is being used for a page component (has larger UI)
      const isPageError = this.props.isPageLevel || false;
      
      if (isPageError) {
        return (
          <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: '#00ffff',
            fontSize: '1.2rem',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
            <h2 style={{ color: '#00ffff', marginBottom: '10px' }}>Oops! Something went wrong</h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>
              The page encountered an error. Please try refreshing or go back.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#00ffff', 
                color: '#000', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '1rem',
                marginRight: '10px'
              }}
            >
              Refresh Page
            </button>
            <button 
              onClick={() => window.history.back()} 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: 'transparent', 
                color: '#00ffff', 
                border: '2px solid #00ffff', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Go Back
            </button>
          </div>
        );
      }
      
      return (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          borderRadius: '50%',
          color: '#00ffff',
          fontSize: '0.8rem',
          textAlign: 'center',
          padding: '20px'
        }}>
          🤖<br/>Loading...
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
