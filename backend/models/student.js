const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Student name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
     password: {
      type: String,
      required: [true, "Password is required"],
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    levels: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
},{timestamps: true})

module.exports = mongoose.model("Student", studentSchema)