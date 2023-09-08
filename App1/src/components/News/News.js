import React, { Component } from 'react';
import NewSingle from './NewSingle';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;    
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          news: data.articles
        })
      })
      .catch((error) => console.log(error));
  }

  renderItems() {
    if (!this.state.news) {
      return null; // or some loading indicator if you prefer
    }

    return this.state.news.map((item) => (
      <NewSingle key={item.url} item={item} />
    ));
  }

  render() {
    return (
      <div className="row">
        {this.renderItems()}
      </div>
    );
  }
}

export default News;
