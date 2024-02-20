const express = require("express");
const users = require("../controllers/user.controller");


const router = express.Router();



router.post("/register", users.register);

router.post("/login", users.login);

router.post("/info", users.infoUser);

router.get("/getAllRoom", users.getAllRoom);

router.post("/orderRoom", users.orderRoom);

module.exports = router;