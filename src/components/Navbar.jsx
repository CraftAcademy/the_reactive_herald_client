import React, { useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const Navbar = props => {
  const { t, i18n } = useTranslation("common");

  const changeLanguage = event => {
    i18n.changeLanguage(event.target.id);
    props.changeLanguage(event.target.id);
  };

  useEffect(() => {
    const browserLanguages = navigator.languages;
    for (let i = 0; i < browserLanguages.length; i++) {
      if (browserLanguages[i].substring(0, 2) == "sv") {
        i18n.changeLanguage("sv");
        props.changeLanguage("sv");
        break;
      } else if (browserLanguages[i].substring(0, 2) == "en") {
        i18n.changeLanguage("en");
        props.changeLanguage("en");
        break;
      }
    }
  }, []);

  const toggleCategory = event => {
    if (event.target.id == "return") {
      props.changeCategory(null);
    } else {
      let itemButtons = document.getElementsByClassName("item-button");
      Array.from(itemButtons).forEach(
        button => (document.getElementById(button.id).style.fontWeight = "300")
      );
      props.changeCategory(event.target.id);
      document.getElementById(event.target.id).style.fontWeight = "900";
    }
  };


  return (
    <>
      <Menu secondary pointing>
        <Menu.Item name={t("nav.global")} />
        <Menu.Item name={t("nav.local")} />
        <Menu.Item name={t("nav.english")} id="en" onClick={changeLanguage} />
        <Menu.Item name={t("nav.swedish")} id="sv" onClick={changeLanguage} />
      </Menu>
      <Menu secondary pointing fluid widths={7}>
        <Menu.Item name={t("nav.all")} id="return" onClick={toggleCategory} />
        <Menu.Item
          name={t("nav.news")}
          className="item-button"
          id="news"
          onClick={toggleCategory}
        />
        <Menu.Item
          name={t("nav.food")}
          className="item-button"
          id="food"
          onClick={toggleCategory}
        />
        <Menu.Item
          name={t("nav.tech")}
          className="item-button"
          id="tech"
          onClick={toggleCategory}
        />
        <Menu.Item
          name={t("nav.culture")}
          className="item-button"
          id="culture"
          onClick={toggleCategory}
        />
        <Menu.Item
          name={t("nav.sports")}
          className="item-button"
          id="sports"
          onClick={toggleCategory}
        />
        <Menu.Item
          name={t("nav.misc")}
          className="item-button"
          id="misc"
          onClick={toggleCategory}
        />
      </Menu>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentArticleId: state.currentArticleId,
    language: state.language,
    currentPage: state.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCategory: category => {
      dispatch({ type: "CHANGE_CATEGORY", payload: category });
    },
    changeLanguage: language => {
      dispatch({ type: "CHANGE_LANGUAGE", payload: language });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
