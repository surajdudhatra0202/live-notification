const mongoose = require("mongoose");

const deviceTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DeviceToken", deviceTokenSchema);
