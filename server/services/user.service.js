const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      order: [],
      giohang: [],
      isAdmin: payload.isAdmin,
    };
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }
  async register(payload) {
    // console.log(payload)
    const user = await this.extractUserData(payload);
    // console.log(user);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { order: [], isAdmin: false, giohang: [] } },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async check(filter) {
    // console.log( filter.email);
    const cursor = await this.User.find(filter);
    return await cursor.toArray();
  }

  async checkEmail(filter) {
    console.log("filter Email: " + filter);
    const cursor = await this.User.find({ email: filter });
    return await cursor.toArray();
  }

  async findUserById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async orderProduct(data) {
    // console.log(data)
    const email = data.user;
    // console.log(email)
    const product = data.product;
    // console.log(product)
    const quantity = data.quantity;
    // console.log(quantity)
    const dataOrder = { product: product, quantity: quantity };
    // console.log(dataOrder)
    const result = await this.User.findOneAndUpdate(
      { email: email },
      { $push: { giohang: dataOrder } },
      { returnDocument: "after" }
    );
    return result;
  }

  async order(data) {
    // console.log(data)
    const email = data.user;
    // console.log(email)
    const products = data.products;
    // console.log(products)
    const phone = data.phone;
    // console.log(phone)
    const address = data.address;
    // console.log(address)
    const total = data.total;

    const dataOrder = {
      products: products,
      total: total,
      phone: phone,
      address: address,
      status: 1,
    };
    // console.log(dataOrder)
    const result = await this.User.findOneAndUpdate(
      { email: email },
      { $push: { order: dataOrder } },
      { returnDocument: "after" }
    );
    // console.log(result)
    return result;
  }

  async deleteOrderProduct(data) {
    console.log(data);
    const email = data.user;
    // console.log(email)
    const product = data.product.product;
    // console.log(product);
    const quantity = data.quantity;
    // console.log(quantity)
    // const dataOrder = { product: product, quantity: quantity };
    // console.log(dataOrder);
    const result = await this.User.updateOne(
      {
        email: email,
      },
      {
        $pull: {
          giohang: {
            product: product,
          },
        },
      }
    );
    // console.log(result)
    return result;
  }

  async deleteAllOrderProduct(data) {
    const email = data.email;
    // console.log(data.email)
    const result = await this.User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          giohang: [],
        },
      },
      { returnDocument: "after" }
    );
    return result;
  }

  async comfirmUserOrderProduct(data) {
    console.log(data)
    const email = data.email;
    // console.log(data.order[0].products)
    const result = await this.User.updateOne(
      {
        email: email,
        'order.products': data.order[0].products,
        'order.total': data.order[0].total,
        'order.phone': data.order[0].phone,
        'order.address': data.order[0].address,
        'order.status': 1,
      },
      {
        $set: {
          'order.$.status': 2,
        },
      },
      {
        returnDocument: "after",
      }
    );
    console.log(result)
    return result;
  }
}

module.exports = UserService;
