const router = require("express").Router();
const apiRoutes = require("./api");

// Use API routes
router.use("/api", apiRoutes);

// Fallback route for handling non-existent endpoints
router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
