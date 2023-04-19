const express = require("express");

const { verifyAdmin, verifyToken } = require("../authentications/authentication");
const adminController = require("../Controllers/adminViewsController");
const authController = require('../Controllers/authController');
const uploadFile = require("../Controllers/uploadFile");
const adminRoute = express.Router();


adminRoute.get("/profile/:id", verifyToken, adminController.profilePage);
adminRoute.get("/leaves", verifyAdmin,adminController.getLeaves);
adminRoute.patch("/leave", verifyAdmin, adminController.leaveFormApprove);
adminRoute.post("/registerStudent", verifyAdmin, authController.register);
adminRoute.post("/notification", verifyAdmin, adminController.notifications);
adminRoute.post("/news", verifyAdmin,uploadFile.uploadImage, adminController.news);
adminRoute.post("/schoolEvents", verifyAdmin, adminController.schoolEvents);
adminRoute.post(
    "/timeTable",
    verifyAdmin,uploadFile.upload,
    adminController.timeTablePassCircular
);
adminRoute.get("/students", verifyAdmin, adminController.getAllStudents);
adminRoute.patch("/block", verifyAdmin, adminController.blockStudent);
adminRoute.post('/email',verifyAdmin,adminController.sendEmail);

module.exports = adminRoute;