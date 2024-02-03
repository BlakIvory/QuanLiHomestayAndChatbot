const ApiError = require("../api-error");
const AdminService = require("../services/admin/admin.service");
const SectorService  = require("../services/sector/sector.service"); 
const RoomService = require("../services/room/room.service");
const UserService = require("../services/user/user.service");
const MongoDB = require("../utils/mongodb.util");
const jwt = require('jsonwebtoken');
const bcrypt =  require ("bcrypt");
const multer = require("multer");

exports.register = async (req, res, next) => {
  const { name, email, password, phone , address } = req.body;
  console.log(req.body)
  try {
    if (!name || !email || !password || !phone || !address){
      return res.status(200).json({ err: 1, msg: "Thông tin không được để trống !" })
    }
    const adminService = new AdminService(MongoDB.client);
    const isRegisted = await adminService.check({"phone" : req.body.phone})
    // console.log(isRegisted)
    if(isRegisted!=0){ 
      return res.send(200,{
        err : -1,
        msg : "Tài khoản đã được tạo trước đó !"
      })
    } 
    else { 
      const document = await adminService.register(req.body);
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
    const adminService = new AdminService(MongoDB.client);
    const isRegisted = await adminService.check({"phone" : req.body.phone})
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


exports.infoAdmin = async (req, res, next) => {
  console.log(req.body)
  try{
    const adminService = new AdminService(MongoDB.client);
    const infoAdmin = await adminService.check({"phone" : req.body.phone})
    // console.log(infoUser)
    return res.send(infoAdmin[0])
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình đăng nhập vào hệ thống !"));
  }
};


exports.addSector = async (req, res, next) => {
  // console.log(req.body)
  // console.log(req.file);
  try{

    const sectorService = new SectorService(MongoDB.client);
    const isInvalids = await sectorService.check({"nameSector" : req.body.nameSector});
    if(isInvalids.length >0) return res.send({status :1 ,msg: "Đã tồn tại khu vực có cùng tên !"})
    if(isInvalids.length ==0 ){
      const input = {
        nameSector: req.body.nameSector,
        discSector : req.body.discSector,
        noteSector : req.body.noteSector,
        imgSector : req.file
      }
      console.log(input)
      const result = await sectorService.addSectorService(input)
      return res.send({
        status :0 ,msg: "Tạo Khu vực thành công !"
      })
    } 
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình tạo khu vực !"));
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



exports.addRoom = async (req, res, next) => {
  console.log(req.body)
  
  try{
    const inputData = {
      nameRoom: req.body.nameRoom,
      idSectorRoom : req.body.idSectorRoom,
      giaRoom : req.body.giaRoom,
      loaiRoom : req.body.loaiRoom,
      imgRoom: req.body.imgRoom
    }

    const roomService = new RoomService(MongoDB.client);
    const result = await roomService.addRoom(inputData);
    if(result){
      return res.status(200).json("result");
    }
    else{
      return res.send("Đã xảy ra lỗi")
    }
    
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình tạo phong !"));
  }
};

exports.getAllRoom = async (req, res, next) => {
  try{
    const roomService = new RoomService(MongoDB.client);
    const data = await roomService.check();
    const result = {
      rooms: data,
      length: data.length,
    }
    if(result){
      return res.status(200).json(result);
    }else{
      return res.send("Đã xảy ra lỗi")
    }
    
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình truy xuat phong !"));
  }
};


exports.getAllUser = async (req, res, next) => {
  try{
    const userService = new UserService(MongoDB.client);
    const data = await userService.check();
    const result = {
      users: data,
      length: data.length,
    }
    if(result){
      return res.status(200).json(result);
    }else{
      return res.send("Đã xảy ra lỗi")
    }
    
  } catch (error) {
    // console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình truy xuat phong !"));
  }
};


exports.deleteRoom = async (req, res, next) => {
  // console.log(req.body)
  try{
    const roomService = new RoomService(MongoDB.client);
    const result = await roomService.deleteRoom(req.body);
    // console.log(result)
    if(result.deletedCount>0){
      return res.status(200).json({
        status: 0,
        msg: "Xóa Phòng Thành Công !!!"
      });
    }
    else{
      return res.status(200).json("code lỗi");
    }
    
  } catch (error) {
    console.log(error)
    return next(new ApiError(500, "Xảy ra lỗi trong quá trình xoa phong !"));
  }
};