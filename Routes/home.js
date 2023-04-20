const express = require("express");
const home = require('../Controllers/homeController');
const homeRoutes = express.Router();
const { verifyToken } = require('../authentications/authentication');

homeRoutes.get('/', (req, res, next) => {
    res.redirect('/login');
})
homeRoutes.get("/home", home.homepage);
homeRoutes.get("/fourLatestNews", home.fourLatestNews);
homeRoutes.get('/news/:id', home.newsDetails);
homeRoutes.get("/notifications", home.getNotifications);
homeRoutes.get("/notification/:id", home.notificationDetails);
homeRoutes.get("/timeTables", home.getTimeTables);
module.exports = homeRoutes;