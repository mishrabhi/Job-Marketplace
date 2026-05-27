require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const ApplicationRoutes = require("./routes/applicationRoutes")
const errorMiddlewares = require("./middlewares/errorMiddleware");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", ApplicationRoutes)

app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
