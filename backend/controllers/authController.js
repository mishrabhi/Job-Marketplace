const bcrypt = require("bcryptjs");
const Company = require("../models/company");
const Student = require("../models/student");
const generateToken = require("../utils/generateToken");

//register company
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password, description, location } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      description,
      location,
    });

    const token = generateToken(company);
    return res.status(201).json({
      success: true,
      message: "Company generated successfully!",
      token,
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login company
exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, company.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(company);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//register student
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, skills, levels } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      skills,
      levels,
    });

    const token = generateToken(student);

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      token,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, student.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(student);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
