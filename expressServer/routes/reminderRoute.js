//routes
const express = require("express");
const router = express.Router();
const {
  saveReminderData,
  fetchReminderData,
} = require("../controllers/reminderController");
//const { saveReminder } = require("../services/reminderService");

/**
 *@swagger
 * /api/subscription/reminder:
 *   post:
 *     tags:
 *       -  Subscription Reminder
 *     summary: Returns  subscription reminder from DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subid:
 *                 type: string
 *                 example: "type subscription id here"
 *
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:  Subscription Reminder data!
 */

/**
 *@swagger
 * /api/subscription/reminder/save:
 *   post:
 *     tags:
 *       -  Subscription  Reminder
 *     summary: Saves the  subscription reminder data into Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subid:
 *                  type: string
 *                  example: "Add subscription id here"
 *               freeTrial:
 *                  type: boolean
 *
 *                  example: "Free Trial True or false"
 *               paymentDue:
 *                  type: boolean
 *                  example: "Payment Due True or false"
 *               paymentDuetom:
 *                  type: boolean
 *                  example: "payment due tomorrow , in 3 days"
 *               active_inactive:
 *                  type: boolean
 *                  example: "active or inactive"
 *               spendSummary:
 *                  type: boolean
 *                  example: "true or false"
 *               mobilePush:
 *                  type: boolean
 *                  example: "mobile push true/false"
 *               desktopPush:
 *                  type: boolean
 *                  example: "desktop Push true /false"
 *               emailRem:
 *                  type: boolean
 *                  example: "email remider true / false"
 
 *
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Subscription reminder data saved successfully"
 */

router.post("/subscription/reminder", fetchReminderData);
router.post("/subscription/reminder/save", saveReminderData);
module.exports = router;
