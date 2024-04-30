import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/home")
      .then((result) => {
        if (result.data !== "Success") {
          navigate("/login");
        } else {
          console.log("Home");
        }
      })
      .catch((err) => console.log(err));
  }, []); // Added navigate as a dependency

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
