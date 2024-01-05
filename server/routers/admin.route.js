const express = require("express");
const admins = require("../controllers/admin.controller");


const router = express.Router();



router.post("/register", admins.register);

// router.post("/login", admins.login);

// router.post("/info", admins.infoUser);


module.exports = router;