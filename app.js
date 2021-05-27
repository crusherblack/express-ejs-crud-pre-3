const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("express-flash");
const session = require("express-session");

const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");
const contohRouter = require("./routes/contoh/about");
const authRouter = require("./routes/auth");

const { authCheck } = require("./middleware/auth");

require("./lib/db");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: {
      expires: 30 * 24 * 60 * 60 * 1000,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }, //hari * jam * menit * detik * milisecond
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

app.use(flash());

app.use("/post", authCheck, postRouter);
app.use("/category", authCheck, categoryRouter);
app.use("/contoh", authCheck, contohRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
