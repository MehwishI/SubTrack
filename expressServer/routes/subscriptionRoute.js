//routes
const express = require("express");
const router = express.Router();
const {
  fetchUserParkingData,
  saveUserParkingData,
} = require("../controllers/subscriptionController");

/**
 *@swagger
 * /api/user/subscription:
 *   post:
 *     tags:
 *       - User Subscription
 *     summary: Returns user subscription from DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 example: "type userid here"
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
 *                   example: User Subscription Data!
 */

/**
 *@swagger
 * /api/user/subscription/save:
 *   post:
 *     tags:
 *       - User Subscription
 *     summary: Saves the user subscription data into Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                  type: string
 *                  example: "Add userid here"
 *               name:
 *                  type: string
 *
 *                  example: "Add subscription name here"
 *               type:
 *                  type: string
 *                  example: "Add type here"
 *               plan:
 *                  type: string
 *                  example: "Add plan here"
 *               price:
 *                  type: Number
 *                  example: "price here"
 *               billFreq:
 *                  type: string
 *                  example: "restriction"
 *               renewalDate:
 *                  type: Date
 *                  example: "renewal date"
 *               status:
 *                  type: string
 *                  example: "status (Active/cancelled)"
 *               paymentMethod:
 *                  type: string
 *                  example: "payment method"
 
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
 *                   example: "User parking data saved successfully"
 */

router.post("/user/subscription", fetchUserParkingData);
router.post("/user/subscription/save", saveUserParkingData);
module.exports = router;
