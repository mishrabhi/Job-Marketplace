const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },

    required_skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    job_type: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },

    posted_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ location: 1 });
jobSchema.index({ salary: 1 });
jobSchema.index({ job_type: 1 });

module.exports = mongoose.model("Job", jobSchema);