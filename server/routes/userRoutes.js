const express = require("express");
const router = express.Router();

const { signIn, registerUser } = require("../controller/userControllers");

router.post("/signin", signIn);
router.post("/register", registerUser);

module.exports = router;
