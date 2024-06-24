const express = require("express");
const path = require("node:path");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const {
  viewsRouter,
  privateViewsRouter,
  authRouter,
  usersRouter,
  educationsRouter,
  awardsRouter,
  certificatesRouter,
  projectsRouter,
} = require('./routers');

const { mongodbUrl, port, secretKey } = require("./config");
const { NotFoundError } = require('./utils/customError');

const app = express();

require("./passport")();

mongoose.connect(mongodbUrl);
mongoose.connection.on("connected", () => {
  console.log("mongodb connected.");
});
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected.");
});
mongoose.connection.on("error", () => {
  console.log("mongodb connection failed.");
});

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(cookieParser(secretKey));

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongodbUrl,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 3600000),
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use(viewsRouter);
// 이 뒤로는 무조건 로그인이 필요해집니다.
app.use(privateViewsRouter);
app.use("/api/users", usersRouter);
app.use('/api/educations', educationsRouter);
app.use('/api/awards', awardsRouter);
app.use('/api/certificates', certificatesRouter);
app.use('/api/projects', projectsRouter);

app.use((req, res, next) => {
  return next(new NotFoundError('페이지를 찾을 수 없습니다.'));
});

// 에러 처리 핸들러 맨 밑으로 ㄱㄱ
app.use((err, req, res, next) => {
  if (!err.statusCode || err.statusCode >= 500) {
    console.error(err);
    return res.status(500).json({ error: "무언가 잘못됨." });
  }
  res.status(err.statusCode).json({ error: err.message });
});

app.listen(port, () => {
  console.log("서버 시작됨");
});
