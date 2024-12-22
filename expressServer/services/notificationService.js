const subModel = require("../models/Subscription");
let userModel = require("../models/User");
let notifModel = require("../models/Notification");
const subService = require("./subscriptionService");
const userService = require("./userDataService");

const { default: mongoose } = require("mongoose");
const User = mongoose.model("User");

//get user notification data from db
//call encrypt data()

const getNotifData = async (subId) => {
  // let userfound = {};
  // try {
  //   userFound = await userService.getUserData(userId);

  //   if (userFound) {
  //     //console.log("userFound in user service", userFound);
  //     if (userFound.emailVerified === false) {
  //       console.log(
  //         "Email not verified, please verify your email to view subscription data. "
  //       );
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // } catch (error) {
  //   console.log(error);
  //   throw error;
  // }
  let subfound = {};
  try {
    subFound = await userService.getSubData(subId);

    if (subFound) {
      //console.log("userFound in parking service", userFound);
      // if (userFound.emailVerified === false) {
      console.log("Subscription data found in notif service");
      return null;
      // }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const notifData = await notifModel
      .find({
        //
        subscription: subfound._id,
      })
      .exec();

    if (!notifData) {
      return null;
    } else return notifData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//post user parking data to db
//call encrypt data()
const saveNotifData = async (notifData, subId) => {
  //find the user with the given userid

  let subFound = null;

  try {
    subFound = await subModel
      .findOne({
        _id: subId,
      })
      .exec();
    if (!subFound) {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
  //let rDate;
  // if (subData.billFreq === "Monthly") {
  //  rDate = new Date()

  //}

  try {
    //create new instance of parking model
    const newItem = new notifModel();
    newItem.subject = notifData.subject;
    newItem.notification_type = notifData.notification_type;
    newItem.subscription = subFound._id;
    // newItem.plan = notifData.plan;

    newItem.date_sent = notifData.date_sent;
    //newItem.renewalDate = notifData.renewalDate; //need to be changed when data will be coming from frontend
    newItem.status = notifData.status;
    newItem.message = notifData.message;

    const savedItem = await newItem.save();

    //update userFound
    subFound.notifList.push(newItem._id);
    subFound.save();

    // res.status(201).json(savedItem);
    return subFound;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = { getNotifData, saveNotifData };
