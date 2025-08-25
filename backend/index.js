const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const notifyRoutes = require("./routes/notify");
const registerRoutes = require("./routes/register");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/notify", notifyRoutes);
app.use("/api/register", registerRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
