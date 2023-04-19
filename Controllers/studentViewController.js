const jwt = require("jsonwebtoken");
const Leave = require('../models/leaveRequestModel');
const Students = require('../models/studentModel');
const multer = require("multer");
const verifytoken = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let decodedTokenId;
  if (token) {
    await jwt.verify(
      token,
      process.env.SECRET_LINE,
      async (err, decodedToken) => {
        if (err) {
          res
            .status(403)
            .json({
              status: "Fail",
              message: "Invelid Token, You are not Authorized",
            });
        }
        decodedTokenId = decodedToken;
      }
    );
  }
  return decodedTokenId;
};


module.exports.leaveRequest = async(req, res, next) => {

    const attachment = req.file;
    const { from, to, reason} = req.body;
    try {
        const decodedTokenId = await verifytoken(req,res);
        const student = await Students.findById(decodedTokenId.id);
        if(attachment !== ''){
          let file = attachment.filename;
          const leaveRequest = await Leave.create({student, from, to, reason,attachment:file});
          const student_update = await Students.findById(decodedTokenId.id);
          student_update.leaves.push(leaveRequest);
          await student_update.save();
          if (!leaveRequest) {
              res.status(400).json({
                  status: "Fail",
                  Message: "Could not send your leave request please try later!"
              })
          }
          res.status(201).json({
              status: "Succes",
              message: "Leave request submitted successfully, Please caheck status Later",
              leaveRequest
          })
        }else{
          const leaveRequest = await Leave.create({
            student,
            from,
            to,
            reason,
            attachment,
          });
          const student_update = await Students.findById(decodedTokenId.id);
          student_update.leaves.push(leaveRequest);
          await student_update.save();
          if (!leaveRequest) {
            res.status(400).json({
              status: "Fail",
              Message: "Could not send your leave request please try later!",
            });
          }
          res.status(201).json({
            status: "Succes",
            message:
              "Leave request submitted successfully, Please caheck status Later",
            leaveRequest,
          });
        }

     } catch (err) { console.log(err) }
}
module.exports.getLeavesByStudentId = async(req,res,next)=>{
   const decodedTokenId = await verifytoken(req, res);
   try{
     const leaves = await Leave.find({student:decodedTokenId.id});
    if(!leaves){
      res.status(400).json({
        status:"Fail",
        message:"There's an error getting your leaves"
      })
    }
    res.status(200).json({
      status:"Success",
      message:"Leaves Fetched Successfully",
      leaves
    })
   }
   catch(err){
      console.log(err);
   }
}
module.exports.editOrDeleteLeave = async(req, res, next) => {
    
}
module.exports.profilePage = async(req, res, next) => {
   try {
        const decodedTokenId = await verifytoken(req,res);
          const profile = await Students.findById(decodedTokenId.id);
          if(!profile) {
            res.status(400).json({
              status:"Fail", 
              message:"Seem to not find you in our system"}
              )};
              profile.password = undefined;
              await profile.populate("leaves");
          res.status(200).json({
            status:"success",
            profile
          })
        }catch(err){
          console.log(err);
        }
}
module.exports.downloadTimeTable = async(req, res, next) => {
    res.send('download');
}