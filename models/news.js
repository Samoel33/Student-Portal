const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now(),
    }
}, { timestamps: true });
const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now(),
    }
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = { News, Notification };