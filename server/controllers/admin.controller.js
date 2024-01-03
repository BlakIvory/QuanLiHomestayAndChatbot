const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
// import { Jwt } from "jsonwebtoken";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


exports.register = async (req, res, next) => {
  const { name, email, password, phone , address } = req.body;
  try {
    if (!name || !email || !password || !phone || !address){
      return res.status(400).json({ err: 1, msg: "Thông tin không được để trống !" })
    }
    const userService = new UserService(MongoDB.client);
    const isRegisted = await userService.check({"phone" : req.body.phone})
    // console.log(isRegisted)
    if(isRegisted!=0){ 
      return res.status(504).json({
        err : -1,
        msg : "Tài khoản đã được tạo trước đó !"
      }); 
    }
    else { 
      const document = await userService.register(req.body);
      return res.status(200).json("Tạo tài khoản thành công " + document);
    }
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình Tạo tài khoản !"));
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
