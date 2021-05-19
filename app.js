//Exports
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const appRoutes = require("./routes/index");
const MongoDBStore = require("connect-mongodb-session")(session);

//MongoDb
const MONGO_URI =
  "mongodb+srv://<USERID>:<PASSWRORD>@cluster0.asp3w.mongodb.net/passportTest?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

//Registering middlewares
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my secret",
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

require("./config/passportConfig");
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/users", appRoutes);

app.get("/", (req, res, next) => {
  res.render("welcome");
});

app.use((err, req, res, next) => {
  console.log(err);
});

//Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connection) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
