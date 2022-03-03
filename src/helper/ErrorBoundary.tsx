import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {
              //@ts-ignore
              this.state.error && this.state.error.toString()
            }
            <br />
            {
              //@ts-ignore
              this.state.errorInfo.componentStack
            }
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
