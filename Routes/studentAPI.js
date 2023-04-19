const express = require('express');
const { verifyToken } = require('../authentications/authentication');
const studentController = require('../Controllers/studentViewController');
const upload = require("../Controllers/uploadFile")

const studentRoute = express.Router();

studentRoute.get('/profile/:id', verifyToken, studentController.profilePage);
studentRoute.post('/leave',upload.uploadAttachment ,studentController.leaveRequest);
studentRoute.get('/myLeaves',studentController.getLeavesByStudentId);
studentRoute.patch('/profile', verifyToken ,studentController.profilePage);
studentRoute.get('/timetable', verifyToken, studentController.profilePage);


module.exports = studentRoute;