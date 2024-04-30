import React, { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data === "Success") {
          navigate("/home");
        } else {
          console.log("Incorrect Pass");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="form-css bg-white rounded p-3">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="m-2">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="m-2 mt-3">
            <button className="btn btn-success">Login</button>
          </div>
          <div>
            <h6>Already Have an Account</h6>
            <Link to={"/register"} className="m-2 btn btn-primary">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
