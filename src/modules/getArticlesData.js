import axios from "axios";

const getCurrentArticle = async () => {
  try {
    const response = await axios.get("/articles/1");
    return response.data.article;
  } catch (error) {
    return error.response.data;
  }
};

const getArticles = async () => {
  const response = await axios.get("/articles");
  return response.data;
};

export { getCurrentArticle, getArticles };
