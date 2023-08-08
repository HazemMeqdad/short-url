const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config()

mongoose.connect("mongodb://localhost:27017/short")

const shortRoutes = require("./api/routes/short");
const userRoutes = require("./api/routes/user");

const app = express();

app.use(morgan("dev"));  // Log requests to console
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

app.use("/short", shortRoutes); // Handle requests to /short
app.use("/user", userRoutes); // Handle requests to /user

const PORT = process.env.PORT || 5000;

app.listen(5000, "0.0.0.0", () => {
    console.log("Server is running on port 5000")
});
