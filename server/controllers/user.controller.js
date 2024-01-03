const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
// import { Jwt } from "jsonwebtoken";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


exports.register = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.register(req.body);
    return res.send(document);
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "An error occurred while creating the User"));
  }
};

exports.login = async (req, res, next) => {
  //  console.log(req.body)
  let documents = [];
  try {
    const userService = new UserService(MongoDB.client);
    documents = await userService.check(req.body);
    if (documents.length >= 1) {
      return res.send(documents);
    } else {
      return next(new ApiError(201, "Sai tai khoản hoặc mật khẩu"));
    }
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving Users"));
  }
};

exports.getAllOrderProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const userService = new UserService(MongoDB.client);
    // const message = "Thêm vào giỏ hàng thành công !";
    const data = await userService.check(req.body);
    // console.log(data[0].giohang);
    const result = {
      products: data[0].giohang,
      message: "Tìm kiếm thành công !",
    };
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
};
exports.orderProduct = async (req, res) => {
  // console.log(req.body);
  try {
    if (req.body.quality != 0) {
      const userService = new UserService(MongoDB.client);
      const message = "Thêm vào giỏ hàng thành công !";
      const data = await userService.orderProduct(req.body);
      const result = {
        data: data,
        message: message,
      };
      // console.log(result)
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.Order = async (req, res) => {
  // console.log(req.body);
  try {
    const userService = new UserService(MongoDB.client);
    let message = "";
    const data = await userService.order(req.body);
    if (!data) {
      const result = {
        message: "Đặt hàng không thành công !",
      };
      // console.log(result);
      return res.send(result);
    } else {
      const result = {
        data: data,
        message: "Đặt hàng thành công !",
      };
      // console.log(result);
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOrderProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const userService = new UserService(MongoDB.client);

    const data = await userService.deleteOrderProduct(req.body);
    if (data) {
      const result = {
        data: data,
        message: "Xóa Thành Công !",
      };
      // console.log(result)
      return res.send(result);
    } else {
    }
    const result = {
      message: "Xóa Không Thành Công !",
    };
    // console.log(result)
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAllOrderProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const userService = new UserService(MongoDB.client);

    const data = await userService.deleteAllOrderProduct(req.body);
    if (data) {
      const result = {
        data: data,
        message: "Xóa Thành Công !",
      };
      // console.log(result)
      return res.send(result);
    } else {
      const result = {
        message: "Xóa Không Thành Công !",
      };
      // console.log(result)
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUserOrder = async (req, res) => {
  // console.log(req.body);
  // return res.send("req.body");
  try {
    const userService = new UserService(MongoDB.client);

    const data = await userService.check(req.body);
    if (data) {
      const result = {
        data: data[0].order,
        message: "Tìm Thành Công !",
      };
      // console.log(result)
      return res.send(result);
    } else {
      const result = {
        message: "Tìm kiếm Không Thành Công !",
      };
      // console.log(result)
      return res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUserOrder = async (req, res) => {
  try {
    
    const userService = new UserService(MongoDB.client);

    const result = await userService.check({});
    return res.send(result);
  } catch (error) {
    console.log(error);
  }
};

exports.confirmUserOrder = async (req, res) => {
  // console.log(req.body)
  try {
    const userService = new UserService(MongoDB.client);

    const data = await userService.comfirmUserOrderProduct(req.body);
    let result;
    let status;
    if (data.modifiedCount > 0) {
      result = {
        status: "1",
        message: "Xác Nhận Đơn hàng thành Công!!!",
      };
    } else {
      result = {
        status: "0",
        message: "Xác Nhận Đơn hàng KHÔNG thành Công!!!",
      };
    }

    return res.send(result);
  } catch (error) {
    console.log(error);
  }
};
