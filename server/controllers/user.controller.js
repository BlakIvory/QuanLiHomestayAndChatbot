const ApiError = require("../api-error");
const UserService = require("../services/user/user.service");
const MongoDB = require("../utils/mongodb.util");
const RoomService = require("../services/room/room.service");
const SectorService = require("../services/sector/sector.service");
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
        msg : isCorrect ? "Đăng nhập thành công !" : "Nhập sai tài khoản hoặc mật Khẩu!",
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

exports.changePassword = async (req, res, next) => {
  const { phone, oldPassword, newPassword } = req.body;
  console.log(req.body)
  try {
    if (!oldPassword || !newPassword || !phone) {
      return res.status(200).json({ err: 1, msg: "Thông tin không được để trống!" });
    }
    const userService = new UserService(MongoDB.client);
    const registeredUser = await userService.check({ "phone": phone });
    // console.log(registeredUser[0])
    if (!registeredUser[0]) {
      return res.status(200).json({
        err: -1,
        msg: "Tài khoản không tồn tại!"
      });
    } else {
      const isCorrect = bcrypt.compareSync(oldPassword, registeredUser[0].password)
      // console.log(isCorrect)
      if (isCorrect) {
        // Tiến hành cập nhật mật khẩu mới tại đây
        const updateResult = await userService.updatePassword(req.body);
        if (updateResult) {
          return res.status(200).json({
            err: 0,
            msg: "Thay đổi mật khẩu thành công!"
          });
        } else {
          return res.status(200).json({
            err: -1,
            msg: "Không thể cập nhật mật khẩu!"
          });
        }
      } else {
        return res.status(200).json({
          err: -1,
          msg: "Sai mật khẩu cũ!"
        });
      }
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình thay đổi mật khẩu!"));
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
  // console.log(req.body.dateInput)
  // console.log(req.body)
  const payload = {
    idUser: idUser,
    idOrder: idOrder,
    dateOrderRoom: req.body.dateInput,
    idRoom: req.body.idRoom,
  }
  try{
    const roomService = new RoomService(MongoDB.client);
    const userService = new UserService(MongoDB.client);
    const result1 = await userService.CancleOrderRoomUser(payload)
    const result2 = await roomService.deleteDateRoom(payload)
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

exports.getInfoSector = async (req, res, next) => {

  // console.log(req.body)
  try{
   
    const sectorService = new SectorService(MongoDB.client);
    const result1 = await sectorService.checkByIdSector(req.body)
// console.log(result1)
    return res.send(result1[0])
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong truy xuat Khu vực!"));
  }
};

exports.getAllSector = async (req, res, next) => {
  try{
    const sectorService = new SectorService(MongoDB.client);
    const data = await sectorService.check();
    const result = {
      sectors: data,
      length: data.length,
    }
    if(result){
      return res.status(200).json(result);
    }else{
      return res.send("Đã xảy ra lỗi")
    }
    
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình truy xuat khu vực !"));
  }
};

exports.UpdateInfoUser = async (req, res, next) => {

  try{
   
    const userService = new UserService(MongoDB.client);
    const result = await userService.UpdateInfoUser(req.body)

    return res.send({
      "status": "1",
      "msg": "Cập nhật thông tin tài khoản thành công !"
    })
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong truy xuat phòng !"));
  }
};










