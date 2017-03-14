import React from 'react';
import isEqual from 'lodash/isEqual';

class Fetch extends React.Component {
  state = {
    data: false,
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

  fetch(props) {
    this.update({ data: getCache(props) });
    if (Array.isArray(props.url)) {
      return Promise.all(props.url.map(url => global.fetch(url, props.config)))
        .then(results => Promise.all(results.map(res => res.json())))
        .then(data => {
          this.update({ data, error: false });
        })
        .catch(error => {
          this.update({ error });
        });
    }
    return global
      .fetch(props.url, props.config)
      .then(res => res.json())
      .then(data => {
        this.update({ data, error: false });
      })
      .catch(error => {
        this.update({ error });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.url, this.props.url)) {
      this.fetch(nextProps);
    }
  }

  render() {
    if (this.state.error && this.props.onError) {
      return this.props.onError(this.state.error);
    }

    if (this.props.children) {
      return this.props.children(this.state.data);
    }

    return null;
  }
}

export default Fetch;
