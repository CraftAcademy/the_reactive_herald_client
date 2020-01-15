import React, { Component } from "react";
import DisplayCurrentArticle from "./components/DisplayCurrentArticle";
import { getData, getCurrentArticle } from "./modules/getData";

class App extends Component {
  state = {
    currentArticle: null,
    message: 'Loading...'
  };

  componentDidMount() {
    this.getArticleShowData();
  }

  async getArticleShowData() {
    const article = await getCurrentArticle();

    if (article.error) {
      this.setState({
        message: article.error 
      })
    } else {
      this.setState({
        currentArticle: article
      });
    }
  }

  render() {
    let currentArticle = this.state.currentArticle,
        message = this.state.message
    return (
      <>
        {
          currentArticle ? (
            <DisplayCurrentArticle
              article={currentArticle}
            />
          ) : (
            <p id="message">{message}</p>
          )
        }
        
      </>
    );
  }
}

export default App;
