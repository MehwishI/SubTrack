const subModel = require("../models/Subscription");
let userModel = require("../models/User");
//const subService = require("./subscriptionService");
const { default: mongoose } = require("mongoose");
const userService = require("../services/userDataService");
const User = mongoose.model("User");

//get user parking data from db
//call encrypt data()

const getSubscriptionData = async (userId) => {
  let userfound = {};
  try {
    userFound = await userService.getUserData(userId);

    if (userFound) {
      //console.log("userFound in parking service", userFound);
      if (userFound.emailVerified === false) {
        console.log(
          "Email not verified, please verify your email to view subscription data. "
        );
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    const subData = await subModel
      .find({
        //
        user: userFound._id,
      })
      .exec();

    if (!subData) {
      return null;
    } else return subData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//post user parking data to db
//call encrypt data()
const saveSubscriptionData = async (subData, userId) => {
  //find the user with the given userid

  let userFound = null;

  try {
    userFound = await userModel
      .findOne({
        userid: userId,
      })
      .exec();
    if (!userFound) {
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
    const newItem = new subModel();
    newItem.name = subData.name;
    newItem.type = subData.type;
    newItem.user = userFound._id;
    newItem.plan = subData.plan;
    newItem.price = subData.price;
    newItem.billFreq = subData.billFreq;
    newItem.startDate = subData.startDate;
    newItem.renewalDate = subData.renewalDate; //need to be changed when data will be coming from frontend
    newItem.status = subData.status;
    newItem.paymentMethod = subData.paymentMethod;

    const savedItem = await newItem.save();

    //update userFound
    userFound.sublist.push(newItem._id);
    userFound.save();

    // res.status(201).json(savedItem);
    return userFound;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = { getSubscriptionData, saveSubscriptionData };
