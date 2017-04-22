import React from 'react';
import isEqual from 'lodash/isEqual';

class Fetch extends React.Component {
  state = {
    data: false,
    loading: true,
  };

  fetch = props => {
    this.update({ data: false, loading: true, error: false });
    if (!props.url) {
      return new Promise(resolve => resolve());
    }
    if (Array.isArray(props.url)) {
      return Promise.all(props.url.map(url => global.fetch(url, props.config)))
        .then(results => Promise.all(results.map(res => res.json())))
        .then(
          data => {
            this.update({ data, error: false, loading: false });
          },
          error => {
            this.update({ data: false, error, loading: false });
          }
        );
    }
    return global
      .fetch(props.url, props.config)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        throw res;
      })
      .then(
        data => {
          this.update({ data, error: false, loading: false });
        },
        error => {
          this.update({ error, data: false, loading: false });
        }
      );
  };

  componentDidMount() {
    this.mounted = true;
    this.fetch(this.props);
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
    if (!isEqual(nextProps.url, this.props.url)) {
      this.fetch(nextProps);
    }
  }

  render() {
    try {
      if (this.props.children) {
        return this.props.children(this.state.data, this.state);
      }

      if (this.state.loading && this.props.onLoading) {
        return this.props.onLoading();
      }

      if (this.state.error && this.props.onError) {
        return this.props.onError(this.state.error, this.fetch);
      }

      if (this.state.data && this.props.onSuccess) {
        return this.props.onSuccess(this.state.data);
      }
    } catch (e) {
      return this.props.onError(e, this.fetch);
    }

    return null;
  }
}

export default Fetch;
