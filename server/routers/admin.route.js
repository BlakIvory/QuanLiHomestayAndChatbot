const express = require("express");
const admins = require("../controllers/admin.controller");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file,cb) {
        return cb(null,"D://LuanVan/Project/client_admin/src/uploads");
    },
    filename: function (req,file,cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }

})
const upload = multer({storage})

router.post("/register", admins.register);

// router.post("/addSector", admins.addSector);

router.post('/addSector',upload.single('imgSector'), admins.addSector);

// router.post("/infoAdmin", admins.infoAdmin);

// router.post("/test", admins.testAddIMG);

module.exports = router;