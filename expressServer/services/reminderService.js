const subModel = require("../models/Subscription");
let userModel = require("../models/User");
const remModel = require("../models/Reminder");
//const subService = require("./subscriptionService");
const { default: mongoose } = require("mongoose");
const userService = require("../services/userDataService");
const User = mongoose.model("User");

//get user subscription reminder data from db
//call encrypt data()

const getReminder = async (subId) => {
  let subfound = {};
  try {
    subFound = await subService.getSubscriptionData(userId);

    if (subFound) {
      //console.log("userFound in parking service", userFound);
      console.log("Subscription data found");
    } else {
      console.log(
        "This Subscription record not found, cannot retrieve reminder data"
      );
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const remData = await remModel
      .find({
        //
        subscription: subId,
      })
      .exec();

    if (!remData) {
      return null;
    } else return remData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//post user parking data to db
//call encrypt data()
const saveReminder = async (remData, subId) => {
  //find the user with the given userid

  let subFound = null;

  try {
    subFound = await subModel
      .findOne({
        subid: subId,
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
  // if (remData.billFreq === "Monthly") {
  //  rDate = new Date()

  //}

  try {
    //create new instance of parking model
    const newItem = new remModel();
    newItem.subscription = subFound._id;
    newItem.freeTrial = remData.freeTrial;
    newItem.paymentDue = remData.paymentDue;
    newItem.paymentDuetom = remData.paymentDuetom;
    newItem.active_inactive = remData.active_inactive;
    newItem.spendSummary = remData.spendSummary;
    newItem.mobilePush = remData.mobilePush;
    newItem.desktopRem = remData.desktopRem; //need to be changed when data will be coming from frontend
    newItem.emailRem = remData.emailRem;
    newItem.paymentMethod = remData.paymentMethod;

    const savedItem = await newItem.save();

    //update userFound
    //userFound.sublist.push(newItem._id);
    //userFound.save();

    //res.status(201).json(savedItem);
    return savedItem;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = { getReminder, saveReminder };
