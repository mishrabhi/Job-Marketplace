const express = require("express");
const {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("student"), applyForJob);

router.get("/", authMiddleware, roleMiddleware("student"), getMyApplications);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("company"),
  updateApplicationStatus,
);

module.exports = router;
