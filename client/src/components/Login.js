import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from 'styled-components'

const Center = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`
const Title = styled.div`
font-size: 3rem;
`

const Form = styled.div`
display: flex;
justify-content: center;
`

const Input = styled.input`
padding: 10px;
padding: 10px 15px;
margin-bottom: 10px;
`

const Circle = styled.div`
background: black;
border-radius: 50%;
height: 300px;
width: 300px;
margin: 0px auto;
background: radial-gradient(circle at 100px 100px, #5cabff, #000);
`

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
    <Center>
    <Title>Bubbles Login </Title>
    <Circle>
      <Form className="form">
        <form onSubmit={login}>
          <Input
            placeholder="Name"
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleChanges}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleChanges}
          />

          <button>Log in</button>
        </form>
      </Form>
      </Circle>
    </Center>
  );
};

export default Login;