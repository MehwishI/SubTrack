const ObjectId = require("mongodb").ObjectId;
const subModel = require("../models/Subscription");
let userModel = require("../models/User");
const remModel = require("../models/Reminder");
//const subService = require("./subscriptionService");
const { default: mongoose } = require("mongoose");
const subService = require("../services/subscriptionService");
const User = mongoose.model("User");

//get user subscription reminder data from db
//call encrypt data()
const findSub = async (subId) => {
  let subFound = null;
  try {
    subFound = await subModel
      .findOne({
        _id: new ObjectId(subId),
      })
      .exec();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
  return subFound;
};

const getReminder = async (subId) => {
  const subFound = await findSub(subId);
  if (!subFound) {
    return null;
  }
  try {
    const remData = await remModel
      .find({
        //
        subscription: subFound._id,
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
  //find the subscription with the given subid

  const subFound = await findSub(subId);
  if (!subFound) {
    return null;
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
