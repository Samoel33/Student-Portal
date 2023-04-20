const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Students = require('../models/studentModel');
const Admin = require('../models/adminModel');


const checkCurrentUser = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        await jwt.verify(token, process.env.SECRET_LINE, async(err, decodedToken) => {
            if (err) {
                res.status(403).json({
                    status: "Invalid Token",
                });
            }
            const user = await Students.findById(decodedToken.id);
            if (!user) {
                const admin = await Admin.findById(decodedToken.id);
                if(!admin){
                      res.status(403).json({
                        status: "Invalid Token",
                      });
                }else{
                    next();
                }
            } else {
                next()  
            }
        });
    } else {
         res.status(403).json({
           status: "not loggedIn ",
         });
    }
}

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        await jwt.verify(token, process.env.SECRET_LINE, (err, decodedToken) => {
            if (err) {
                 sessionStorage.removeItem("UserInfo");
                 localStorage.removeItem("Authorization");
                res.status(403).json({
                    status: "Invalid Token", 
                });
            }
            next();
        });
    } else {
        res.status(403).json({
            status: "Invalid Token",
        });
    }
}
const verifyAdmin = async(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        await jwt.verify(
            token,
            process.env.SECRET_LINE,
            async(err, decodedToken) => {
                if (err) {
                    res.status(403).json({
                        status: "Invalid Token",
                    });
                    // next();
                }
                const user = await Admin.findById(decodedToken.id);
                if (!user) {
                    res.status(403).json({
                        status: "User Not Found",
                    });
                }
                console.log(user);
                if (user.role === "Admin") {
                    next();
                } else {
                    res.status(403).json({
                        message: "YOU are not Authorized"
                    })
                }
            }
        );
    } else {
        next();
    }
}
module.exports = { verifyToken, checkCurrentUser, verifyAdmin };