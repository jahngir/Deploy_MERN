const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModal = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")

dotenv.config();
const app = express();

// restrictions for API which page to asscess and which not in cors

//mongodc pass = LTdc06MmKB2BCO6Q

app.use(
  cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://jahangirsoomro30:LTdc06MmKB2BCO6Q@cluster0.ejtefgz.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster0");

// JWT Token Auth Verification

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Then Token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        res.json("Token is Wrong");
      }
      next();
    });
  }
};

// JWT Auth verification API

app.get("/home", verifyUser, (req, res) => {
  return res.json("Success");
});

// Register API

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModal.create({ name, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

// Login API

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModal.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            res.json("Success");
          } else {
            res.json(err);
          }
        });
      } else {
        res.json("Record Not Existed");
      }
    })
    .catch((err) => res.json(err));
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
