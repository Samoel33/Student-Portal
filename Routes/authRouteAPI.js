const express = require("express");
const authController = require("../Controllers/authController");

const authRoute = express.Router();

authRoute.get("/logout", authController.logout);
authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.patch("/forgotPassword", authController.forgotPassword);

module.exports = authRoute;