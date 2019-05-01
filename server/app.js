var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
// var path = require('path');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();

var indexRouter = require("./routes/login");
var newsRouter = require("./routes/news");
var roasterRouter = require("./routes/roaster");
var meterialRouter = require("./routes/meterial");
var historyRouter = require("./routes/history");
var tableRouter = require("./routes/table");
var testRouter = require("./routes/test");

//解决跨域以及请求头的设置
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", indexRouter);
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
