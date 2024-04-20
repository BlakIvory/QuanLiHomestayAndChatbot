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
    try {
      // Cập nhật trạng thái thanh toán của đơn hàng dựa trên idOrder
      const result = await this.User.findOneAndUpdate(
        { "order.idOrder": payload.idOrder },
        { $set: { "order.$.pay": "true" } },
        { returnDocument: "after" }
      );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Có lỗi xảy ra khi cập nhật trạng thái thanh toán.");
    }
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

  async UpdateInfoUser(payload) {
    const idUser = payload.idUser;
  
    const updateFields = {};
    if (payload.email) updateFields.email = payload.email;
    if (payload.password) updateFields.password = payload.password;
    if (payload.name) updateFields.name = payload.name;
    if (payload.phone) updateFields.phone = payload.phone;
    if (payload.address) updateFields.address = payload.address;
    if (payload.img) updateFields.img = payload.img;
    // Thêm các trường khác tương tự
  
    const result = await this.User.findOneAndUpdate(
      {
        _id: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
      },
      {
        $set: updateFields,
      },
      { returnDocument: "after" }
    );
  
    return result;
  }



  async  CancleOrderRoomByChatBot(payload) {
    const idOrder = payload.idOrder;

    // Tìm order dựa trên idOrder
    const order = await this.User.findOne({ "order.idOrder": idOrder });
  
    if (!order) {
      return "Không tìm thấy order nào có id " + idOrder;
    }
  
    const statusOrder = order.order.find((o) => o.idOrder === idOrder).statusOrder;
  
    if (statusOrder === "10") {
      return {
        status : 1,
        msg :"Đơn đặt phòng đã được hủy trước đó. !"
      };
    } else if (statusOrder === "1" || statusOrder === "2") {
      // Cập nhật statusOrder lên 10
      const result = await this.User.findOneAndUpdate(
        { "order.idOrder": idOrder },
        { $set: { "order.$.statusOrder": "10" } },
        { returnDocument: "after" }
      );
      console.log(result)
      return {
        result : result,
        status : 0,
      };
    } else if(statusOrder === 3 ){
      return {
        status : 2,
        msg :"Đơn đặt phòng đã được hoàn thành nên không thể hủy !."
      };
    }
  }


  async  GetInfoOrderRoomByChatBot(payload) {
    try {
      const idOrder = payload.idOrder;
      // Kiểm tra idOrder không phải là undefined hoặc null
      if (!idOrder) {
        throw new Error('idOrder không được cung cấp hoặc không hợp lệ.');
      }
      // Tìm user dựa trên idOrder
      const user = await this.User.findOne({ "order.idOrder": idOrder });
      // Kiểm tra user có tồn tại và có mảng orders
      if (!user || !user.order) {
        console.log('Không tìm thấy user hoặc mảng orders với idOrder cung cấp.');
        return null;
      }
      // Tìm order cụ thể trong mảng orders
      const specificOrder = user.order.find(order => order.idOrder === idOrder);
      // Kiểm tra specificOrder có tồn tại
      if (!specificOrder) {
        console.log('Không tìm thấy order cụ thể với idOrder cung cấp.');
        return null;
      }
      // Trả về order tìm được
      return specificOrder;
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error('Lỗi khi tìm kiếm order:', error);
      return null;
    }
  }
  
  
   
  


}

module.exports = UserService;
