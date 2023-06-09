require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Web3 = require('web3');
const session = require('express-session');
const cors = require('cors');

// const MemoryStore = require("memorystore")(session);
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const {sequelize} = require('./models');
const app = express();
const routes = require('./routes');

sequelize
  .sync({force: false})
  .then(() => {
    console.log('데이터베이스 연결되었습니다.');
  })
  .catch(err => {
    console.error(err);
  });

app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: false})); // uri 파싱
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(
//   cors(),
//   //   {
//   //   origin: 'http://localhost:3000/',
//   //   credentials: true, // 크로스 도메인 허용
//   //   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
//   // }
// );

app.use(
  session({
    secret: 'Hello!',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
    rolling: false,
    cookie: {
      httpOnly: false,
      //   secure: true,
      //   sameSite: 'none',
    },
  }),
);

app.use('/', routes);

// const getAccounts = async () => {
//   const web3 = new Web3(
//     new Web3.providers.HttpProvider("http://127.0.0.1:8555")
//   );
//   const accounts = await web3.eth.getAccounts();
//   const serverAddress = accounts([0]);
//   console.log(accounts);
//   return accounts;
// };

// getAccounts();

const PORT = process.env.PORT || 5500;

module.exports = app.listen(PORT, () => {
  console.log(`Server Listening on Port : ${PORT}!!!`);
});
