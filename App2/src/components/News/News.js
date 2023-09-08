import React, { Component } from 'react';
import NewSingle from './NewSingle';
import Error from './Error';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      error: false,
    };
    this.isComponentMounted = false;
  }

  componentDidMount() {
    this.isComponentMounted = true; 
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (this.isComponentMounted) {
          this.setState({
            news: data.articles,
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
      if (Array.isArray(this.state.news) && this.state.news.length > 0) {
        return this.state.news.map((item) => (
          <NewSingle key={item.url} item={item} />
        ));
      } else {
        return <p>No news articles to display.</p>;
      }
    } else {
      return <Error />;
    }
  }
  
  
  render() {
    return <div className="row">{this.renderItems()}</div>;
  }
}

export default News;
