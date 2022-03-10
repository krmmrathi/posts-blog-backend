const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 8080;
const config = require("./config");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});

module.exports = app;