import React, { useState, useEffect } from "react";
import PT from "prop-types";

const initialFormValues = {
  username: "",
  password: "",
};
export default function LoginForm({ login }) {
  const [values, setValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  // ✨ where are my props? Destructure them here

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value.trim() });
    const username = document.querySelector("#username").value.length > 2 ? true : false;
    const password = document.querySelector("#password").value.length > 7 ? true : false;

    if (username && password) setDisabled(false);
    else setDisabled(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    login(values);
  };

  return (
    <form id='loginForm' onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder='Enter username'
        id='username'
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder='Enter password'
        type='password'
        id='password'
      />
      {/* <button disabled={disabled} id='submitCredentials'> */}
      <button id='submitCredentials' disabled={disabled}>
        Submit credentials
      </button>
    </form>
  );
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
};
