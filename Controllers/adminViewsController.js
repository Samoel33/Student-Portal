const jwt  = require("jsonwebtoken");
const { News, Notification } = require('../models/news');
const Leave = require('../models/leaveRequestModel');
const Students = require('../models/studentModel');
const nodemail = require("nodemailer");
const Admin = require("../models/adminModel");
const path = require("path");
const multer = require("multer");
const TimeTable = require("../models/timeTable");


module.exports.leaveFormApprove = async(req, res, next) => {
    const leave = await Leave.findByIdAndUpdate(req.body.id, { status: req.body.status }, { new: true });
    if (leave) {
        res.status(200).json({
            status: "Success",
            message: "Your requeste went Leave",
            leave
        });
    }
};
module.exports.getLeaves = async(req,res,next)=>{
    const leaves = await Leave.find().sort({date:-1});
    if(!leaves){
        res.status(200).json({
            status:"success",
            message:"No leaves from students"
        })
    }
    res.status(200).json({
        status:"success",
        leaves});
}

const verifytoken = async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    let decodedTokenId;
    if(token){
        await jwt.verify(token,process.env.SECRET_LINE,async(err,decodedToken)=>{
            if(err){res.status(403).json({ status:"Fail", message:"Invelid Token, You are not Authorized"})}
           decodedTokenId =  decodedToken;
        })
    }
    return decodedTokenId;
}
module.exports.profilePage = async(req, res, next) => {
    try{

    const verifyToken = await verifytoken(req,res);
    console.log(verifyToken.id);
            const user = await Admin.findById(verifyToken.id)
            if (!user) {
              res.status(400).json({
                status: "Fail",
                message: "NO found in our DATABASE",
              });
            }
            user.password = undefined;
            res.status(200).json({
              status: "Success",
              message: "User successfully fetched",
              user,
            });
          }
    catch (err) {
      console.log(err);
}
}

module.exports.notifications = async(req, res, next) => {
    const notification = await Notification.create(req.body);
    if (notification) {
        res.status(201).json({
            status: "Success",
            message: "Notification added successufully",
            notification
        });
    }
};

module.exports.schoolEvents = async(req, res, next) => {
    res.status(201).json({
        status: "Success",
        message: "Your requeste went events",
    });
};

module.exports.news = async(req, res, next) => {
    const news = await News.create(req.body);
    if (news) {
        res.status(201).json({
            status: "Success",
            message: "News added successfully",
            news
        });
    }
};
function getDate(){
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}


module.exports.timeTablePassCircular = async(req, res, next) => {
       const file = req.file;
       const {title} = req.body;
   try{ if (file) {
        const fileUpload = await TimeTable.create({
            description: title,
            timeTable:file.filename
        })
        res.status(201).json({
            status: "Success",
            message: "all  added successfully",
            fileUpload
        });
    }}catch(err){
        res.status(400).json({
            err,
        })
    }
};
module.exports.getAllStudents = async(req, res, next) => {
    const students = await Students.find().sort({ studentNumber: -1 }).populate("leaves");
    if (students) {
        res.status(201).json({
            status: "Success",
            message: "all  added successfully",
            students,
        });
    }
};
module.exports.blockStudent = async(req, res, next) => {
    const student = await Students.findOneAndUpdate({ studentNumber: req.body.studentNumber }, { blocked: req.body.blocked }, { new: true });
    if (student) {
        res.status(203).json({
            status: "blocked",
            message: "Student Blocked",
            student
        })
    }
}
module.exports.sendEmail = async(req, res, next) => {
    let details = req.body;
    const students = await Student.find();
    if(students){
        let emails = [];
        students.forEach(student =>{
            emails.push(student.email);
        })
        res.send(emails);
        // let mailTransport = nodemail.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: "samoel.seshoka@gmail.com",
        //     pass: process.env.EMAILPASSWORD,
        //   },
        // });
        // let emailDetails = {
        //   from: "samoel.seshoka@gmail.com",
        //   to: `${emails}`,
        //   subject: "etails.subject",
        //   text: "my name is student portal can you see",
        // };
        // mailTransport.sendMail(emailDetails, (err) => {
        //   if (err) {
        //   
        //    res.json(err);
        //   }
        //   console.log("message sent successfully");
        //   res.status(200).json({status:"Successful", message:"message sent successfully");
        // });
    }
}
module.exports.generateStudentID = async(req, res, next) => {
    const date = Date.now();
    console.log(date);
}