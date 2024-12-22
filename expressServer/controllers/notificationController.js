const subService = require("../services/notificationService");
const {
  getDecryptedData,
  getEncrytedData,
} = require("../services/encryptService");

const fetchNotificationData = async (req, res) => {
  try {
    const subData = await subService.getNotfication(req.body.userid);
    if (!subData) {
      res.status(404).send("Notification data not available for this user.");
    } else {
      return res.status(200).send(subData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const saveNotificationData = async (req, res) => {
  // start decrypt data
  const getDecryptData = req.body;
  //getDecryptedData(req.body);

  const userid = getDecryptData.userid;
  const subid = getDecryptData.subid;

  const notData = {
    subject: getDecryptData.subject,
    notification_type: getDecryptData.notification_type,
    frequency: getDecryptData.frequency,
    status: getDecryptData.status,
    date_sent: getDecryptData.date_sent,

    message: getDecryptData.message,

    //parking_date: Date.now(),
  };
  try {
    const savedSub = await subService.saveNotficationData(subData, userid);
    if (savedSub) {
      return res.status(200).send("notification data saved successfully!");
    } else res.status(500).send("sub notification data not saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { fetchNotificationData, saveNotificationData };
