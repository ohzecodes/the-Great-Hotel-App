require("dotenv").config();
let mongoose = require("mongoose");
let mongoDB = process.env.CONNECTION_STRING;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => {
    console.log("error happened :>> ", e);
  });
mongoose.connection.on("error", console.error.bind(console, "MongoDB Error:"));

module.exports = mongoose.connection;
