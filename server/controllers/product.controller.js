const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
const MongoDB = require('../utils/mongodb.util');

exports.createProduct = async (req, res, next) => {
    // console.log(req.body);
  try {
    // console.log(req.body)
    const productService = new ProductService(MongoDB.client);
    // console.log(req.body);
    const document = await productService.createProduct(req.body);
    // console.log(document)
    return res.send(document);
  } catch (error) {
    // console.log(error)
    return next(
      new ApiError(500, 'An error occurred while creating the product')
    );
  }
}
exports.getAllProducts = async(req,res) => {
  try {
    const productService= new ProductService(MongoDB.client)
    
    const products = await productService.AllProducts();
    // console.log("req")
    return res.send(products)
  } catch (error) {
    console.log(error)
  }

}
