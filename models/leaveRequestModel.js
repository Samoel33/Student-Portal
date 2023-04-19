const mongoose = require('mongoose');
const leaveRequestSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
        
    },
    from: {
        type: String,
        default: Date.now(),
        required: true,
    },
    to: {
        type: String,
        default: Date.now(),
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
        default: "no attachment"
    },
    status: {
        type: String,
        default: "pending"
    }

}, { timestamps: true });

const Leave = mongoose.model("Leave", leaveRequestSchema);
module.exports = Leave;