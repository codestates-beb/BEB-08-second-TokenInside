const express = require("express");
const app = express();
require("dotenv").config();

const routes = require("./routes");

app.use("/", routes);

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
  console.log(`Server Listening on Port : ${PORT}!!!`);
});
