const express = require("express");
const admins = require("../controllers/admin.controller");
const multer = require("multer");

const router = express.Router();



router.post("/register", admins.register);

// router.post("/addSector", admins.addSector);

router.post('/addSector', admins.addSector);


router.get("/getAllSector", admins.getAllSector);

router.post('/addRoom', admins.addRoom);

router.post('/deleteRoom', admins.deleteRoom);

router.get("/getAllRoom", admins.getAllRoom);

router.get("/getAllUser", admins.getAllUser);

router.post('/confirmOrderRoom', admins.confirmOrderRoom);


module.exports = router;