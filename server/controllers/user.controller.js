const ApiError = require("../api-error");
const UserService = require("../services/user/user.service");
const MongoDB = require("../utils/mongodb.util");
const RoomService = require("../services/room/room.service");
// import { Jwt } from "jsonwebtoken";
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt =  require ("bcrypt");



exports.register = async (req, res, next) => {
  const { name, email, password, phone , address } = req.body;
  console.log(req.body)
  try {
    if (!name || !email || !password || !phone || !address){
      return res.status(200).json({ err: 1, msg: "Thông tin không được để trống !" })
    }
    const userService = new UserService(MongoDB.client);
    const isRegisted = await userService.check({"phone" : req.body.phone})
    // console.log(isRegisted)
    if(isRegisted!=0){ 
      return res.send(200,{
        err : -1,
        msg : "Tài khoản đã được tạo trước đó !"
      })
    } 
    else { 
      const document = await userService.register(req.body);
      return res.status(200).json({err:0,msg : "Tạo tài khoản thành công ",
        data : document
    } );
    }
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình Tạo tài khoản !"));
  }
};

exports.login = async (req, res, next) => {
  // console.log(req.body)
  const {  phone, password   } = req.body;
  try {
    if ( !password || !phone ){
      return res.status(200).json({ err: 1, msg: "Thông tin không được để trống !" })
    }
    const userService = new UserService(MongoDB.client);
    const isRegisted = await userService.check({"phone" : req.body.phone})
    // console.log(isRegisted[0].phone)
    if(!isRegisted[0]){ 
      return res.status(200).json({
        err : -1,
        msg : " Tài khoản không tồn tại !"
      }); 
    }
    else {
      const isCorrect = bcrypt.compareSync(req.body.password, isRegisted[0].password)
      const token = isCorrect && jwt.sign({password: isRegisted[0].password, phone: isRegisted[0].phone}, process.env.SECRET_KEY,{expiresIn:'1d'}) 
      
      const result = {
        err : isCorrect ? 0 : 2,
        msg : isCorrect ? "Đăng nhập thành công !" : "Sai mật Khẩu",
        User : isRegisted[0],
        token : token || null,
      }
      return res.status(200).json(result)

    }
   
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình đăng nhập vào hệ thống !"));
  }
};

exports.infoUser = async (req, res, next) => {
  // console.log(req)
  try{
    const userService = new UserService(MongoDB.client);
    const infoUser = await userService.check({"phone" : req.body.phone})
    // console.log(infoUser)
    return res.send(infoUser[0])
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình đăng nhập vào hệ thống !"));
  }
};


exports.getAllRoom = async (req, res, next) => {
  
  try{
    const roomService = new RoomService(MongoDB.client);
    const allRoom = await roomService.check()
    return res.send(allRoom)
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình truy xuất tất cả phòng !"));
  }
};

exports.orderRoom = async (req, res, next) => {
  const idv4 = uuidv4();
  const room = {
    idRoom  : req.query.Room._id,
    dateOrderRoom : req.query.infoOrder.dateInput,
  }
  console.log(req.query.infoOrder)
  const infoOrder  =  { 
    idUser : req.query.infoOrder.idUser,
    userInput : req.query.infoOrder.userInput,
    phoneInput : req.query.infoOrder.phoneInput,
    idRoom : req.query.infoOrder.idRoom,
    dateInput : req.query.infoOrder.dateInput,
    totalMoney : req.query.infoOrder.totalMoney,
    pay: req.query.infoOrder.pay,
    statusOrder : req.query.infoOrder.statusOrder,
    idOrder :  idv4
  } 
  const user = {
    info : infoOrder,
  }
  // console.log(req.query)
  try{
    const userService = new UserService(MongoDB.client);
    const roomService = new RoomService(MongoDB.client);
    const result1 = await roomService.OrderRoom(room)
    const result2 = await userService.OrderRoomUser(user)
    return res.send(result2)
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình đặt phòng !"));
  }
};


exports.getInfoRoom = async (req, res, next) => {

  // console.log(req.body)
  try{
   
    const roomService = new RoomService(MongoDB.client);
    const result1 = await roomService.checkByIdRoom(req.body)

    return res.send(result1)
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong truy xuat phòng !"));
  }
};


exports.cancleOrderRoom = async (req, res, next) => {
  const idUser = req.body.idUser;
  const idOrder = req.body.idOrder;
  console.log(req.body)
  const payload = {
    idUser: idUser,
    idOrder: idOrder,
  }
  try{
   
    const userService = new UserService(MongoDB.client);
    const result1 = await userService.CancleOrderRoomUser(payload)

    return res.send(result1)
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong truy xuat phòng !"));
  }
};


exports.updatePaypalOrder = async (req, res, next) => {
  const idUser = req.body.idUser;
  const idOrder = req.body.idOrder;
  // console.log(req.body)
  const payload = {
    idUser: idUser,
    idOrder: idOrder,
  }
  try{
   
    const userService = new UserService(MongoDB.client);
    const result1 = await userService.PayOrder(payload)

    return res.send(result1)
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong truy xuat phòng !"));
  }
};

