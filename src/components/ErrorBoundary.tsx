import { Component, Fragment } from 'react';

import { Props } from '../types/types';

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
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
