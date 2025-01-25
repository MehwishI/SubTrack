const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: false },
  userEmail: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true },
  businessName: { type: String, required: true },
  country: { type: String, required: true },
  industry: { type: String, required: true },
  Language: { type: String, required: true },
  sublist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false,
    },
  ],
});
module.exports = mongoose.model("User", UserSchema);
