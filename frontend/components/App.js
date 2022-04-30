import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate, Redirect } from "react-router-dom";
import Articles from "./Articles";
import LoginForm from "./LoginForm";
import Message from "./Message";
import ArticleForm from "./ArticleForm";
import Spinner from "./Spinner";
import axios from "axios";
import ProtectedRoute from "../utils/ProtectedRoute";
import axiosWithAuth from "../axios";

const articlesUrl = "http://localhost:9000/api/articles";
const loginUrl = "http://localhost:9000/api/login";

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState();
  const [spinnerOn, setSpinnerOn] = useState(false);

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => {
    /* ✨ implement */
    navigate("/");
  };
  const redirectToArticles = () => {
    /* ✨ implement */
    navigate("/articles");
  };

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem("token");
    setMessage("Goodbye!");
    redirectToLogin();
  };

  const login = (values) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage("");
    setSpinnerOn(true);
    axios
      .post("http://localhost:9000/api/login", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setMessage(res.data.message);
        setSpinnerOn(false);
        redirectToArticles();
      })
      .catch((err) => console.error({ err }))
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage("");
    setSpinnerOn(true);
    //my axios with auth wasnt workin ;(
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:9000/api/articles", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.error({ err });
        if (err.response.status === 401) redirectToLogin();
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const postArticle = (article) => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage("");
    setSpinnerOn(true);
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:9000/api/articles", article, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setArticles([...articles, res.data.article]);
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const updateArticle = (article_id, article) => {
    // ✨ implement
    // You got this!
    setMessage("");
    setSpinnerOn(true);
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:9000/api/articles/${article_id}`, article, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        setArticles(
          articles.map((art, idx) => {
            if (idx + 1 === res.data.article.article_id) {
              return { ...article, article_id: idx + 1 };
            } else return art;
          })
        );
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const deleteArticle = (article_id) => {
    // ✨ implement
    setMessage("");
    setSpinnerOn(true);
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:9000/api/articles/${article_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
        // setArticles([...articles, res.data.article]);
        setArticles(
          articles.filter((article, idx) => {
            if (idx + 1 !== article_id) {
              return article;
            }
          })
        );
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <React.StrictMode>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id='logout' onClick={logout}>
        Logout from app
      </button>
      <div id='wrapper' style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        {" "}
        {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id='loginScreen' to='/'>
            Login
          </NavLink>
          <NavLink id='articlesScreen' to='/articles'>
            Articles
          </NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<LoginForm login={login} />} />
          <Route
            path='articles'
            element={
              <>
                <ArticleForm
                  updateArticle={updateArticle}
                  postArticle={postArticle}
                  currentArticleId={currentArticleId}
                  setCurrentArticleId={setCurrentArticleId}
                />
                <Articles
                  getArticles={getArticles}
                  articles={articles}
                  setCurrentArticleId={setCurrentArticleId}
                  deleteArticle={deleteArticle}
                />
              </>
            }
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </React.StrictMode>
  );
}
