const mongoose = require("mongoose");
const User = require("./User");

const SubscriptionSchema = new mongoose.Schema({
  //parkid: { type: Number, required: true },

  name: { type: String, required: true },
  type: { type: String, required: true },
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  billFreq: { type: String, required: true },
  startDate: { type: Date, requried: true, default: Date.now() },
  renewalDate: {
    type: Date,
    required: true,
  },
  status: { type: String, requried: true },

  paymentMethod: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  notifList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotifList",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
