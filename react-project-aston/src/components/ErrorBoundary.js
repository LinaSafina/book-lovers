import { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <p className='info'>Something went wrong!</p>
          <p className='info'>{this.state.errorMessage}</p>
        </Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
