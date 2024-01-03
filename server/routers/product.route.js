const express = require("express");
const products = require("../controllers/product.controller");


const router = express.Router();



router.post("/createProduct", products.createProduct);

// router.post("/logiadsn", users.lodsagin);
router.get("/getProducts", products.getAllProducts);



module.exports = router;