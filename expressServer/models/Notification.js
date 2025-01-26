const mongoose = require("mongoose");
const User = require("./User");
const Subscription=require("./Subscription")

const NotificationSchema = new mongoose.Schema({
  
  
  subject:{ type:String, requried:true}
  reminder_type: { type: String, required: true },
  frequency:{ type: String, required: true },
  status: {type: String, requried: true}
  date_sent: { type: Date, required: true, default: Date.now() },
  subscription: {type:mongoose.Types.ObjectId, ref:"Subscription"},
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  message: {type:String, required:false, default:"Your Subscription Reminder"}
});

module.exports = mongoose.model("Notification", NotificationSchema);
