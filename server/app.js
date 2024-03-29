"use strict";
const express = require("express");
const DB = require("./db");
const config = require("./config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const db = new DB("sqlitedb");
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);

router.post("/register", function (req, res) {
  // register a new user
  db.insert(
    [req.body.name, req.body.user_name, bcrypt.hashSync(req.body.password, 8)],
    function (err) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      db.selectByUser(req.body.user_name, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
        console.log("Successfully registered  ", req.body.user_name);
      });
    }
  );
});
router.post("/register-admin", function (req, res) {
  // register an admin
  db.insertAdmin(
    [
      req.body.name,
      req.body.user_name,
      bcrypt.hashSync(req.body.password, 8),
      1,
    ],
    function (err) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      db.selectByUser(req.body.user_name, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
        console.log("Successfully registered as admin", req.body.user_name);
      });
    }
  );
});

router.post("/login", (req, res) => {
  db.selectByUser(req.body.user_name, (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    console.log(
      `User ${req.body.user_name} successfully logged in. Admin: ${user.is_admin}`
    );
    res.status(200).send({ auth: true, token: token, user: user });
  });
});

app.use(router);

let port = process.env.PORT || 3000;

let server = app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
