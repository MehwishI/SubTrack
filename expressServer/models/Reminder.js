const mongoose = require("mongoose");
const User = require("./User");
const Subscription=require("./Subscription")

const ReminderSchema = new mongoose.Schema({
  //parkid: { type: Number, required: true },

  freeTrial: { type: Boolean, required: true },
  paymentDue: { type: Boolean, required: true },
  paymentDuetom: { type: Boolean, required: true },
  active_inactive: { type: Boolean, required: true },
  spendSummary: { type: Boolean, required: true },
 
  mobilePush: { type: Boolean,  required: true },
  desktopRem: { type: Boolean, requried: true },
  emailRem: { type: Boolean, required: true },
 // user: { type: mongoose.Types.ObjectId, ref: "User" },
  subscription: { type: mongoose.Types.ObjectId, ref: "Subscription" },

  // notifList: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "NotifList",
  //     required: false,
  //   },
  // ],
});

module.exports = mongoose.model("Reminder", ReminderSchema);
