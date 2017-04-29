import React from 'react';
import isEqual from 'lodash/isEqual';

class PromiseComponent extends React.Component {
  state = {
    data: false,
    canceled: false,
    loading: true,
  };

  getPromise = props => {
    this.update({ canceled: false, data: false, loading: true, error: false });
    return props.getPromise(props).then(
      data => {
        this.update({ data, error: false, loading: false });
      },
      error => {
        this.update({ error, data: false, loading: false });
      }
    );
  };

  retryPromiseWithNewProps = newProps =>
    this.getPromise({
      ...this.props,
      ...newProps,
    });
  handleCancel = () => this.setState({ canceled: true });

  componentDidMount() {
    this.mounted = true;
    this.getPromise(this.props);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  update(...args) {
    if (this.mounted) {
      this.setState(...args);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.getPromise(nextProps);
    }
  }

  render() {
    try {
      if (this.state.canceled && this.props.onCancel) {
        return this.props.onCancel(this.props, this.retryPromiseWithNewProps);
      }

      if (this.props.children) {
        return this.props.children(this.state.data, this.state, this.props);
      }

      if (this.state.loading && this.props.onLoading) {
        return this.props.onLoading(this.props, this.handleCancel);
      }

      if (this.state.error && this.props.onError) {
        return this.props.onError(
          this.state.error,
          this.retryPromiseWithNewProps
        );
      }

      if (this.state.data && this.props.onSuccess) {
        return this.props.onSuccess(this.state.data);
      }
    } catch (e) {
      return this.props.onError(e, this.retryPromiseWithNewProps);
    }

    return null;
  }
}

export default PromiseComponent;
