const { News,Notification } = require('../models/news');
const TimeTable = require('../models/timeTable');

module.exports.homepage = async(req, res, next) => {
    const news = await News.find();
    if (!news) {
        res.status(400).json({
            status: "Fail",
            message: "No News",
            news: []
        })
    }
    res.status(200).json({
        status: "Success",
        message: "Home page here",
        news
    })
}
module.exports.fourLatestNews = async(req, res, next) => {
    const news = await News.find({}).sort({ postedOn: -1 }).limit(3);
    if (!news) {
        res.status(400).json({
            status: "Fail",
            message: "No News",
            news: [],
        });

    }
    res.status(200).json({
        status: "Success",
        message: "Successfully got the news for you😀",
        news,
    });
}
module.exports.newsDetails = async(req, res, next) => {
    const id = req.params.id;
    const news = await News.findById(id);
    if (!news) {
        res.status(400).json({
            status: "Fail",
            message: "No News",
            news: ''
        });
    }
    res.status(200).json({
        status: "Success",
        message: "Successfully got the news for you😀",
        news,
    });
}
module.exports.notificationDetails = async (req, res, next) => {
  const id = req.params.id;
  const notification = await Notification.findById(id);
  if (!notification) {
    res.status(400).json({
      status: "Fail",
      message: "No News",
      notification: "",
    });
  }
  res.status(200).json({
    status: "Success",
    message: "Successfully got the news for you😀",
    notification,
  });
};
module.exports.getNotifications = async (req, res, next) => {
  const notifications = await Notification.find();
  if (notifications) {
    res.status(200).json({
      status: "Success",
      message: "Notification added successufully",
      notifications,
    });
  }
};
module.exports.getTimeTables =async(req,res,next)=>{
    try{
        const timeTables = await TimeTable.find();
    if(timeTables){
        res.status(200).json({
            status:"Success",
            timeTables,
        })
    }
}catch(err){
    res.status(400).json({
        err
    })
}
}