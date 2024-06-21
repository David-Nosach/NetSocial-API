const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// Set up port
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use(routes);

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialnetwork",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Log MongoDB queries being executed
mongoose.set("debug", true);

// Start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
