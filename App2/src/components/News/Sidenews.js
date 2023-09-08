import React, { Component } from 'react';
import axios from 'axios';
import SingleSide from './SingleSide';
import Error from './Error';

class Sidenews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidenews: [],
      error: false,
    };
    this.isComponentMounted = false; 
  }

  componentDidMount() {
    this.isComponentMounted = true; 
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        if (this.isComponentMounted) {
          this.setState({
            sidenews: response.data.articles,
          });
        }
      })
      .catch((error) => {
        if (this.isComponentMounted) {
          this.setState({
            error: true,
          });
        }
      });
  }

  componentWillUnmount() {
    this.isComponentMounted = false; 
  }

  renderItems() {
    if (!this.state.error) {
      return this.state.sidenews.map((item) => (
        <SingleSide key={item.url} item={item} />
      ));
    } else {
      return <Error />;
    }
  }

  render() {
    return <div>{this.renderItems()}</div>;
  }
}

export default Sidenews;
