const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Students = require('../models/studentModel');
const Admin = require("../models/adminModel");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_LINE, { expiresIn: "3h" });
};
const createSendToken = (student, statusCode, req, res) => {
    if (student.blocked === true) {
        res.status(401).json({
            statu: "Fail",
            message: "Blocked, See Admin for further reasons"
        })
    }
    const token = signToken(student._id);
    res.cookie("Auth", token, { expiresIn: "3h", httpOnly: true });
    student.password = undefined;
    res.status(statusCode).json({
        status: "Success",
        message:"Successfully Logged In",
        token,
        student: {
            id:student.id,
            role: student.role,
            name: student.fullName
        },
    });
};
module.exports.register = async(req, res, next) => {
    const {
        fullName,
        studentNumber,
        idNumber,
        email,
        phoneNumber,
        maritalStatus,
        gender,
        password,
    } = req.body;
    try {
        if (password) {
            const hashedPassword = await bcrypt.hashSync(password, 12);
            const student = await Students.create({
                fullName,
                studentNumber,
                idNumber,
                email,
                phoneNumber,
                maritalStatus,
                gender,
                password: hashedPassword,
            });
            if(student){
                createSendToken(student, 201, req, res)
            }else{
                res.status(400).json({
                    status:"Fail",
                    message:"Registration was not Successful try in few Minutes"
                })
            }
        }
    } catch (err) {
        if(err.code === 11000){
            res.status(400).json({
                status:"Fail",
                message:"student already exist, please login with your credentials"
            })
        }
    }
};
module.exports.login = async(req, res, next) => {
    const { studentNumber, password } = req.body;
    try {
        if(JSON.stringify(studentNumber).includes("@")){
            const admin = await Admin.findOne({email:studentNumber})
            if(!admin || await !(bcrypt.compare(password,admin.password))){
            res.status(401).json({
                status:'Fail',
                message:"Email or Password Incorrect"
                })
                }else{
                    createSendToken(admin,200,req,res);
                }
        }else{
            const student = await Students.findOne({studentNumber:studentNumber});
            if(!student || await !(bcrypt.compare(password,student.password))){
                res.status(401).json({
                    status: "Fail",
                    message: "Student Number or Password Incorrect",
                });
               }
            createSendToken(student, 200, req, res);
            }
    } catch (err)
     {
       res.json({err,
        message:"Erro occured on our side"});
    }
}

module.exports.logout = async(req, res, next) => {
    res.cookies('Auth', " ", { maxAge: 1 });
    
};
module.exports.forgotPassword = async(req, res, next) => {
    const { studentNumber, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 12);
    if(!JSON.stringify(studentNumber).includes("@")){
    const student = await Students.findOneAndUpdate({ studentNumber }, { password: hashedPassword }, {
        new: true,
        returnOriginal: false,
        runValidators: true,
    });
    if (!student) {
        res.status(400).json({
            status: 'Fail',
            message: "No student with an ID"
        })
    }
    res.status(200).json({
        status: 'Success',
        message: 'Password successfully updated',
    })
}else{
          const admin = await Admin.findOneAndUpdate({email},{password:hashedPassword},{new:true,returnOriginal:false,runValidators:true})
          if(!admin){
         res.status(400).json({
           status: "Fail",
           message: "No student with an ID",
         });
      }
       res.status(200).json({
         status: "Success",
         message: "Password successfully updated",
       });
}
}