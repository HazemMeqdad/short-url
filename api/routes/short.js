const express = require("express");
const shortController = require("../controllers/short");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/", checkAuth, shortController.shorten)

module.exports = router;
