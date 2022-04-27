import { Component, Fragment } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <p className='info'>Something went wrong!</p>
        </Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
