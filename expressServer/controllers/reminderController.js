const remService = require("../services/reminderService");
const {
  getDecryptedData,
  getEncrytedData,
} = require("../services/encryptService");

const fetchReminderData = async (req, res) => {
  try {
    const remData = await remService.getReminder(req.body.subid);
    if (!remData) {
      res.status(404).send("Reminder data not available for this user.");
    } else {
      return res.status(200).send(remData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const saveReminderData = async (req, res) => {
  // start decrypt data
  const getDecryptData = req.body;
  //getDecryptedData(req.body);

  //const userid = getDecryptData.userid;
  const subid = getDecryptData.subid;

  const remData = {
    freeTrial: getDecryptData.freeTrial,
    paymentDue: getDecryptData.paymentDue,
    paymentDuetom: getDecryptData.paymentDuetom,
    active_inactive: getDecryptData.active_inactive,
    spendSummary: getDecryptData.spendSummary,

    mobilePush: getDecryptData.mobilePush,
    desktopRem: getDecryptData.desktopRem,
    emailRem: getDecryptData.emailRem,
  };

  // const notData = {
  //   subject: getDecryptData.subject,
  //   notification_type: getDecryptData.notification_type,
  //   frequency: getDecryptData.frequency,
  //   status: getDecryptData.status,
  //   date_sent: getDecryptData.date_sent,

  //   message: getDecryptData.message,

  //   //parking_date: Date.now(),
  // };

  try {
    const savedRem = await remService.saveReminder(remData, subid);
    if (savedRem) {
      return res.status(200).send("Reminder data saved successfully!");
    } else res.status(500).send("sub notification reminder data not saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { fetchReminderData, saveReminderData };
