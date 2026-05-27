const express = require("express");
const {
  createJob,
  getJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("company"), createJob);

router.get("/", getJobs);

router.get("/:id", getSingleJob);

router.put("/:id", authMiddleware, roleMiddleware("company"), updateJob);

router.delete("/:id", authMiddleware, roleMiddleware("company"), deleteJob);

module.exports = router;
