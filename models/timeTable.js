const mongoose = require("mongoose");

const timeTableSchema = new mongoose.Schema(
{
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    timeTable:{
        type:String,
        required:[true,"Time Table file is required before submitting"]
    },
    uploadedAT:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});

const  TimeTable =mongoose.model("TimeTable",timeTableSchema);
module.exports = TimeTable; 