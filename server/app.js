var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
var session = require("express-session");

//解决跨域以及请求头的设置
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3005");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

var loginRouter = require("./routes/login");
var newsRouter = require("./routes/news");
var roasterRouter = require("./routes/roaster");
var meterialRouter = require("./routes/meterial");
var historyRouter = require("./routes/history");
var tableRouter = require("./routes/table");
var testRouter = require("./routes/test");

// session
app.use(
  session({
    name: "dxsystem",
    secret: "p4f8051f-c883-4147-8fe2", // 用来对session id相关的cookie进行签名
    saveUninitialized: true, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 有效期，单位是毫秒 这里是一周
    }
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("p4f8051f-c883-4147-8fe2"));

app.use("/api", loginRouter);
app.use("/api", newsRouter);
app.use("/api", roasterRouter);
app.use("/api", meterialRouter);
app.use("/api", historyRouter);
app.use("/api", tableRouter);
app.use("/api", testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
