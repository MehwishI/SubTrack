const mongoose = require("mongoose");
const User = require("./User");
const Subscription = require("./Subscription");

const PaymentHistorySchema = new mongoose.Schema({
  //parkid: { type: Number, required: true },

  
  amount: { type: Number, required: true },
 
  paymentDate: {
    type: Date,
    required: true,
  },
  status: {type: String, requried: true}
  paymentMethod: { type: String, required: true },
  subscription: { type: mongoose.Types.ObjectId, ref: "Subscription" },
});

module.exports = mongoose.model("PaymentHistory", PaymentHistorySchema);
