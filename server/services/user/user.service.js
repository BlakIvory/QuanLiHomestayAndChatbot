const { ObjectId } = require("mongodb");
// import { Jwt } from "jsonwebtoken";
const jwt = require("jsonwebtoken");
// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");

const hashpwd = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

require("dotenv").config();
// console.log(process.env.SECRET_KEY)
class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      address: payload.address,
      phone: payload.phone,
      token: payload.token,
      img: payload.img,
      isAdmin: payload.isAdmin,
    };
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async check(filter) {
    // console.log( filter.email);
    const cursor = await this.User.find(filter);
    return await cursor.toArray();
  }

  async register(payload) {
    const JWTtoken = jwt.sign(
      { phone: payload.phone, password: payload.password },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    // console.log(JWTtoken)
    const input = {
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      email: payload.email,
      order: payload.order,
      password: hashpwd(payload.password),
      token: JWTtoken,
    };
    const user = await this.extractUserData(input);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { img: {}, order: [] } },
      { returnDocument: "after", upsert: true }
    );

    return result;
  }

  async OrderRoomUser(payload) {
    const idUser = payload.info.idUser;

    const result = await this.User.findOneAndUpdate(
      { _id: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null },
      {
        $push: {
          order: payload.info,
        },
      },
      { returnDocument: "after" }
    );

    return result;
  }
  async CancleOrderRoomUser(payload) {
    const idUser = payload.idUser;
    const idOrder = payload.idOrder;
    console.log(payload);
    const result = await this.User.findOneAndUpdate(
      {
        _id: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
        "order.idOrder": idOrder,
      },
      {
        $set: { "order.$.statusOrder": "10" },
      },
      { returnDocument: "after" }
    );

    return result;
  }

  async PayOrder(payload) {
    const idUser = payload.idUser;
    const idOrder = payload.idOrder;
    // console.log(payload)
    const result = await this.User.findOneAndUpdate(
      {
        _id: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
        "order.idOrder": idOrder,
      },
      {
        $set: { "order.$.pay": true },
      },
      { returnDocument: "after" }
    );

    return result;
  }

  async ConfirmOrder(payload) {
    const idUser = payload.idUser;
    const idOrder = payload.idOrder;
    console.log(payload);
    const result = await this.User.findOneAndUpdate(
      {
        _id: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
        "order.idOrder": idOrder,
      },
      {
        $set: { "order.$.statusOrder": "2" },
      },
      { returnDocument: "after" }
    );

    return result;
  }

  async completeOrderRoom(payload) {
    const idUser = payload.idUser;
    const idOrder = payload.idOrder;
    console.log(payload);
    const result = await this.User.findOneAndUpdate(
      {
        _id: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
        "order.idOrder": idOrder,
      },
      {
        $set: { "order.$.statusOrder": "3" ,
                "order.$.pay"  : "true" ,
        },
      },
      { returnDocument: "after" }
    );

    return result;
  }

  async DeleteOrderRoom(payload) {
    const { idUser, idOrder } = payload;
    console.log(payload);
    if (!ObjectId.isValid(idUser)) {
      return null; // hoặc xử lý lỗi tương ứng
    }
    try {
      const result = await this.User.findOneAndUpdate(
        {
          _id: new ObjectId(idUser),
          "order.idOrder": idOrder,
        },
        {
          $pull: { order: { idOrder: idOrder } },
        },
        { returnDocument: "after" }
      );
      // console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
