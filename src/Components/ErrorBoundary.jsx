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
