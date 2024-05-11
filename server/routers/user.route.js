const express = require("express");
const users = require("../controllers/user.controller");


const router = express.Router();



router.post("/register", users.register);

router.post("/login", users.login);

router.post("/info", users.infoUser);

router.get("/getAllRoom", users.getAllRoom);

router.post("/orderRoom", users.orderRoom);

router.post("/infoRoom", users.getInfoRoom);

router.post("/cancleOrderRoom", users.cancleOrderRoom);

router.post("/updatePaypalOrder", users.updatePaypalOrder);

router.post("/infoSector", users.getInfoSector);

router.post("/updateInfoUser", users.UpdateInfoUser);

router.get("/getAllSector", users.getAllSector);

router.post('/changePassword', users.changePassword);
module.exports = router;
