import React, { useEffect, useState } from "react";
import PT from "prop-types";
import axios from "axios";

const initialFormValues = { title: "", text: "", topic: "" };

export default function ArticleForm({
  postArticle,
  updateArticle,
  currentArticleId,
  setCurrentArticleId,
}) {
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  // ✨ where are my props? Destructure them here

  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    if (currentArticleId) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:9000/api/articles/`, {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          console.log(currentArticleId);
          console.log(res.data.articles[currentArticleId - 1]);
          const theArticle = res.data.articles[currentArticleId - 1];
          setValues({
            title: theArticle.title,
            text: theArticle.text,
            topic: theArticle.topic,
          });
        })
        .catch((err) => {
          console.error({ err });
        });
    } else setValues(initialFormValues);
  }, [currentArticleId]);

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
    const title = document.querySelector("#title").value.length > 0 ? true : false;
    const text = document.querySelector("#text").value.length > 0 ? true : false;
    const topic = document.querySelector("#topic").value.length > 0 ? true : false;

    if (title && text && topic) setDisabled(false);
    else setDisabled(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    if (currentArticleId === undefined) postArticle(values);
    else {
      console.log("updating article with this id: ", currentArticleId);
      updateArticle(currentArticleId, values);
    }
    setValues(initialFormValues);
    setDisabled(true);
  };

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id='form' onSubmit={onSubmit}>
      <h2>Create Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder='Enter title'
        id='title'
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder='Enter text'
        id='text'
      />
      <select onChange={onChange} id='topic' value={values.topic}>
        <option value=''>-- Select topic --</option>
        <option value='JavaScript'>JavaScript</option>
        <option value='React'>React</option>
        <option value='Node'>Node</option>
      </select>
      <div className='button-group'>
        <button disabled={disabled} id='submitArticle'>
          Submit
        </button>
        <button onClick={() => setCurrentArticleId(undefined)}>Cancel edit</button>
      </div>
    </form>
  );
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({
    // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  }),
};
