import React from 'react';
import { ModalDescription } from '../pages/DeveloperDashboard';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <ModalDescription style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            Something went wrong.
          </ModalDescription>
          <div style={{ textAlign: 'center' }}>
            <a href="https://hiredevs.vercel.app">Go to home page</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
