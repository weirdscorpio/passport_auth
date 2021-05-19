const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controllers
const loginController = require("../controllers/login");
const registerController = require("../controllers/register");
require('../config/passportConfig')
const isAuth = require('../middleware/isAuth')


router.get("/login", loginController.getLogin);

router.get("/register", registerController.getRegister);

router.get("/loggedIn",isAuth, loginController.getLoggedIn);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/loggedIn",
    failureRedirect: "/users/login",
  }),
  (req, res, next) => {console.log('here')}
);

router.post("/register", registerController.postRegister);

router.post("/logout", loginController.postLogout)

module.exports = router;
