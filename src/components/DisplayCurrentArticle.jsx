import React from "react";
import { connect } from 'react-redux'
import { getCurrentArticle } from "../modules/getArticlesData";

const DisplayCurrentArticle = ( props ) => {
  
  const getArticleShowData = async (id) => {
    const article = await getCurrentArticle(id);

    if (article.error) {
      props.changeMessage(article.error)
    }
  }

  if (props.currentArticle) {
    getArticleShowData(props.currentArticle.id)
  }

  return (
    <>
    {props.currentArticle ? (
      <div id="main-article-div" key={props.currentArticle.id}>
        <p id="article-title">{props.currentArticle.title}</p>
        <p id="article-body">{props.currentArticle.body}</p>
      </div>
    ) : (
      <p id="message">{props.message}</p>
    )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentArticle: state.currentArticle,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: message => {dispatch({type: 'CHANGE_MESSAGE', payload: message })},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCurrentArticle)
