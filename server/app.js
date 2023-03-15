require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require("./models");
const app = express();
const routes = require("./routes");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결되었습니다.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); // 로그
app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use("/", routes);

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
  console.log(`Server Listening on Port : ${PORT}!!!`);
});
