import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", loginForm)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log(err.response);
        setLoginForm({ username: "", password: "" });
      });
  };

  return (
    <>
      <div className="form">
        <form onSubmit={login}>
          <input
            placeholder="Name"
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleChanges}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleChanges}
          />

          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;