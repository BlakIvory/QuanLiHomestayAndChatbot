
class ProductService {
  constructor(client) {
    this.Product = client.db().collection("products");
  }
  extractProductData(payload) {
    // console.log(payload)
    const product = {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      quantity: payload.quantity,
      note: payload.note,
      img: {
        nameImg: payload.img.nameImg,
        srcImg: payload.img.srcImg,
      },
    };

    Object.keys(product).forEach(
      (key) => product[key] === undefined && delete product[key]
    );
    return product;
  }
  async createProduct(payload) {
    console.log(payload);
    const product = await this.extractProductData(payload);
    const result = await this.Product.findOneAndUpdate(
      product,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }
  async AllProducts() {
    const products = await this.Product.find({});
    //  console.log( result);
    return await products.toArray();
  }

 
}

module.exports = ProductService;
