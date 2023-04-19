const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    profilePhoto:{
        type:String,
        default:"user.png",
    },
    fullName: {
        type: String,
        required: true,
        unique: false,
    },
    studentNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    idNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    DOB: {
        type: String

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Student",
    },
    registeredOn: {
        type: Date,
        default: Date.now(),
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    leaves:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Leave"
    }]
}, { timestamps: true });

const Students = mongoose.model('Students', studentSchema);
module.exports = Students;