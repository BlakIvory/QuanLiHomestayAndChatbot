const express = require("express");
const admins = require("../controllers/admin.controller");
const multer = require("multer");

const router = express.Router();
const fileUploader = require('../config/cloudinary.config');


router.post("/register", admins.register);

// router.post("/addSector", admins.addSector);

router.post('/addSector',fileUploader.single('imgSector'), admins.addSector);

// router.post("/infoAdmin", admins.infoAdmin);

// router.post("/test", admins.testAddIMG);

router.get("/getAllSector", admins.getAllSector);

router.post('/addRoom',fileUploader.array('imgRoom',3), admins.addRoom);

router.get("/getAllRoom", admins.getAllRoom);

router.get("/getAllUser", admins.getAllUser);


module.exports = router;