import axios from "axios";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUpPage() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === "email") {
      setInputData((inputData) => {
        return { ...inputData, email: e.target.value };
      });
    }
    if (e.target.name === "password") {
      setInputData((inputData) => {
        return { ...inputData, password: e.target.value };
      });
    }
    if (e.target.name === "username") {
      setInputData((inputData) => {
        return { ...inputData, username: e.target.value };
      });
    }
    if (e.target.name === "pictureUrl") {
      setInputData((inputData) => {
        return { ...inputData, pictureUrl: e.target.value };
      });
    }
  }

  async function signIn(e) {
    e.preventDefault();
    setIsLoading(true);
    const { email, password, username, pictureUrl } = inputData;
    const body = {
      email,
      password,
      username,
      pictureUrl,
    };

    axios
      .post(`http://localhost:5000/auth/signup`, body)
      .then((res) => {
        setIsLoading(false);
        console.log("cadastro com sucesso");
        navigate("/auth/login");
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }
  return (
    <LoginPageContainer>
      <ThumbContainer>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </ThumbContainer>
      <LoginContainer>
        <FormContainer onSubmit={signIn}>
          <input
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="e-mail"
            required
          />
          <input
            onChange={handleChange}
            name="password"
            id="password"
            type="password"
            placeholder="password"
            required
          />
          <input
            onChange={handleChange}
            name="username"
            id="username"
            type="username"
            placeholder="username"
            required
          />
          <input
            onChange={handleChange}
            name="pictureUrl"
            id="pictureUrl"
            type="pictureUrl"
            placeholder="picture url"
            required
          />
          <button type="submit">
            {isLoading ? <ProgressBar borderColor="#ffffff" /> : "Sign Up"}
          </button>
        </FormContainer>
        <Link to="/auth/login">doesn't have an account? click here to register</Link>
      </LoginContainer>
    </LoginPageContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
  width: 100%;
  input {
    height: 8vh;
    width: 80%;
    padding-left: 2%;
    border: none;
    border-radius: 6px;
    background-color: #ffffff;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    text-align: left;

    :focus {
      background-color: #ffffff;
      border: none;
      outline: none;
    }
  }
  button {
    height: 8vh;
    width: 80%;
    background-color: #1877f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
    :hover {
      cursor: pointer;
    }
  }

  @media (max-width: 780px) {
    input {
      font-family: Oswald;
      font-size: 22px;
      font-weight: 700;
      line-height: 33px;
      letter-spacing: 0em;
      text-align: left;
    }
    button {
      font-family: Oswald;
      font-size: 22px;
      font-weight: 700;
      line-height: 33px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
`;

const ThumbContainer = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 60%;
    h1 {
      color: #ffffff;
      font-family: Passion One;
      font-size: 106px;
      font-weight: 700;
      line-height: 117px;
      letter-spacing: 0.05em;
      text-align: left;
    }
    h2 {
      color: #ffffff;
      font-family: Oswald;
      font-size: 43px;
      font-weight: 700;
      line-height: 64px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  @media (max-width: 780px) {
    width: 100%;
    height: 30dvh;
    max-height: 200px;
    div {
      width: 80%;
      h1 {
        color: #ffffff;
        font-family: Passion One;
        font-size: 76px;
        font-weight: 700;
        line-height: 84px;
        letter-spacing: 0.05em;
        text-align: center;
      }
      h2 {
        color: #ffffff;
        font-family: Oswald;
        font-size: 23px;
        font-weight: 700;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: center;
        flex-wrap: wrap;
      }
    }
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  background-color: #333333;
  width: 35%;

  a {
    color: #ffffff;
    font-family: Lato;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    width: 80%;
  }

  @media (max-width: 780px) {
    width: 100vw;
    justify-content: flex-start;
    padding-top: 4vh;
    a {
      font-family: Lato;
      font-size: 17px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
`;

export const LoginPageContainer = styled.div`
  background-color: #151515;
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }
`;