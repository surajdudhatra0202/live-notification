const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "../firebase-key.json"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function sendNotification(token, title, body, totalCalls, completedCalls) {
  const message = {
    token,
    data: { title, body, totalCalls : String(totalCalls), completedCalls : String(completedCalls) }, // only data payload
    android: { priority: "high" },
    apns: { headers: { "apns-priority": "10" } },
  };

  return await admin.messaging().send(message);
}

module.exports = { sendNotification };
