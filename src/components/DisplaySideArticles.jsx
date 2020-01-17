import React from "react";
import { connect } from "react-redux";
import { getArticles } from "../modules/getArticlesData";

const DisplaySideArticles = (props) => {
  const getArticleShowData = async () => {
    const articlesData = await getArticles();
    props.changeSideArticlesData(articlesData);    
  };

  if (!props.sideArticles) {
    getArticleShowData();
  }

  if (props.sideArticles) {
    props.changeCurrentArticleId(props.sideArticles.articles[0].id)
  }

  let articlesList;

  if (props.sideArticles) {
    let articlesList = props.sideArticles.articles.map(x => {
      return (
        <div id={`side-articles-div-${x.id}`} key={x.id}>
          <p id="article-title">{x.title}</p>
          <p id="article-body">{x.body}</p>
        </div>
      );
    });
    return articlesList;
  } 

  return <>{props.sideArticles ? articlesList : <p id="message">Loading...</p>}</>;
};

const mapStateToProps = state => {
  return {
    sideArticles: state.sideArticles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSideArticlesData: articlesData => {
      dispatch({ type: 'CHANGE_ARTICLES_DATA', payload: articlesData })
    },
    changeCurrentArticleId: id => {dispatch({ type: 'CHANGE_ARTICLE_ID', payload: id })},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplaySideArticles);
