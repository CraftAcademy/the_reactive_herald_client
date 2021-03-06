import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../modules/article";
import { useTranslation } from "react-i18next";
import { Button } from "semantic-ui-react";

const DisplaySideArticles = props => {
  const { t } = useTranslation();

  const getArticleShowData = async () => {
    const articlesData = await getArticles(
      props.language,
      props.currentPage,
      props.category
    );
    props.changeSideArticlesData(articlesData);
    props.changeCurrentPage(articlesData.meta.current_page);
  };

  useEffect(() => {
    getArticleShowData();
    if (props.sideArticles && props.sideArticles.articles.length > 0) {
      props.changeCurrentArticleId(props.sideArticles.articles[0].id);
    }
  }, [props.currentPage]);

  useEffect(() => {
    if (props.sideArticles && props.sideArticles.articles.length > 0) {
      props.changeCurrentArticleId(props.sideArticles.articles[0].id);
    } else if (props.sideArticles && props.sideArticles.articles.length == 0 && props.category ) {
      props.changeSideMessage(`${t("dsa.categoryEmpty")}`);
      props.changeMessage(`${t("dsa.categoryEmpty")}`);
      props.changeCurrentArticle("");
      props.changeCurrentArticleId(null);
    } else if (props.sideArticles && props.sideArticles.articles.length == 0) {
      props.changeSideMessage(`${t("dsa.error")}`);
      props.changeCurrentArticleId("");
      props.changeCurrentArticleId(null);
    }
  }, [props.sideArticles]);

  useEffect(() => {
    getArticleShowData();
  }, [props.language, props.category]);

  const pageButtonHandler = newPageNumber => {
    props.changeCurrentPage(newPageNumber);
  };

  let articlesList;

  if (props.sideArticles && props.sideArticles.articles.length > 0) {
    articlesList = props.sideArticles.articles.map(article => {
      if (article.id !== props.currentArticleId) {
        return (
          <div id={`side-article-${article.id}`} key={article.id}>
            <a
              onClick={() => props.changeCurrentArticleId(article.id)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {article.title}
            </a>
            <p>{article.body}</p>
          </div>
        );
      }
    });
  }

  return (
    <>
      <div id="side-articles">
        {!props.sideArticles ? (
          <p id="message">{t("dsa.loading")}</p>
        ) : props.sideArticles.articles.length > 0 ? (
          articlesList
        ) : (
          <p id="error-message">{props.sideMessage}</p>
        )}
      </div>
      <div>
        {(props.sideArticles && props.sideArticles.meta.prev_page != null) ? (
          <Button basic color="black"
          id="prev-button"
          onClick={() => pageButtonHandler(props.currentPage - 1)}
        >
          <i aria-hidden="true" class="left chevron icon"></i>
          {t("dsa.prevPageButton")}
        </Button>
        ) : null}
        {(props.sideArticles && props.sideArticles.meta.next_page != null) ? (
        <Button basic color="black"
          id="next-button"
          onClick={() => pageButtonHandler(props.currentPage + 1)}
        >
          {t("dsa.nextPageButton")}
          <i aria-hidden="true" class="right chevron icon"></i>
        </Button>
        ) : null }
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    sideArticles: state.sideArticles,
    currentArticleId: state.currentArticleId,
    currentPage: state.currentPage,
    language: state.language,
    category: state.category,
    sideMessage: state.sideMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSideArticlesData: articlesData => {
      dispatch({ type: "CHANGE_ARTICLES_DATA", payload: articlesData });
    },
    changeCurrentPage: currentPage => {
      dispatch({ type: "CHANGE_CURRENT_PAGE", payload: currentPage });
    },
    changeCurrentArticleId: id => {
      dispatch({ type: "CHANGE_ARTICLE_ID", payload: id });
    },
    changeSideMessage: message => {
      dispatch({ type: "CHANGE_SIDEMESSAGE", payload: message });
    },
    changeMessage: message => {
      dispatch({ type: "CHANGE_MESSAGE", payload: message });
    },
    changeCurrentArticle: article => {
      dispatch({ type: "CHANGE_ARTICLE", payload: article });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplaySideArticles);
