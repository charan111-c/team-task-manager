const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});


// AUTH ROUTES
app.use("/api/auth", require("./routes/authRoutes"));


// PROJECT ROUTES
app.use("/api/projects", require("./routes/projectRoutes"));


app.use("/api/tasks", require("./routes/taskRoutes"));

// SERVER
app.listen(5000, () => {
  console.log("Server Started");
});
