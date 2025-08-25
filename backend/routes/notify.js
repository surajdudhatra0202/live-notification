const express = require("express");
const { sendNotification } = require("../services/fcmService");

const router = express.Router();

router.post("/", async (req, res) => {
  const { token, title, body, totalCalls, completedCalls } = req.body;

  if (!token || !title || !body || !totalCalls || !completedCalls) {
    return res.status(400).json({ error: "token, title, body, totalcalls, completedcalls required" });
  }

  try {
    const response = await sendNotification(token, title, body, totalCalls, completedCalls);
    res.json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
