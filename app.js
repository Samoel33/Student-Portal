const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const studentViews = require('./Routes/studentAPI');
const adminViews = require('./Routes/adminAPI');
const authorize = require('./Routes/authRouteAPI');
const { checkCurrentUser } = require("./authentications/authentication");
const home = require('./Routes/home');
const path = require("path");
const app = express();
const port = process.env.PORT || 3004;
const dbURL = process.env.MONGODB_URL

app.use(express.static(path.join,__dirname('public')));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan('dev'))
app.use(cookieParser())


app.use('/', home);
app.use('/api/schoolPortal/auth', authorize);
app.use("/api/admin", adminViews);
app.use('/api/student', studentViews);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: "this is actually your fault, follow the paths. You got lost🔥",
  });
});

mongoose.connect(dbURL, (err, client) => {
    if (err) console.log(err.message);
    app.listen(port, (err, server) => {
        if (err) console.log('server not runnnig because:', err);
        console.log('server running on port:', port);
    })
});