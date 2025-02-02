const subService = require("../services/subscriptionService");
const {
  getDecryptedData,
  getEncrytedData,
} = require("../services/encryptService");

const fetchUserSubscriptionData = async (req, res) => {
  try {
    const subData = await subService.getSubscriptionData(req.body.userid);
    if (!subData) {
      res.status(404).send("Subscription data not available for this user.");
    } else {
      res.status(200).send(subData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const saveUserSubscriptionData = async (req, res) => {
  // start decrypt data
  const getDecryptData = req.body;
  //getDecryptedData(req.body);

  const userid = getDecryptData.userid;

  const subData = {
    name: getDecryptData.name,
    type: getDecryptData.type,
    plan: getDecryptData.plan,
    price: getDecryptData.price,
    billFreq: getDecryptData.billFreq,
    startDate: getDecryptData.startDate,
    renewalDate: getDecryptData.renewalDate,
    status: getDecryptData.status,
    paymentMethod: getDecryptData.paymentMethod,

    //parking_date: Date.now(),
  };
  try {
    const savedSub = await subService.saveSubscriptionData(subData, userid);
    if (savedSub) {
      res.status(200).send("subscription data saved successfully!");
    } else res.status(500).send("User subscription data not saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { fetchUserSubscriptionData, saveUserSubscriptionData };
