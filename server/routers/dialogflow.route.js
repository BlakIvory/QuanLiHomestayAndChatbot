const express = require("express");
const dialogflow = require("../controllers/dialogflow.controller");
const multer = require("multer");

const router = express.Router();

router.post("", async (req, res) => {
  // console.log(req.body.queryResult);
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;
  if (intent === "test webhook") {
    return res.send({
      fulfillmentText: "u will be call Api from server",
    });
  }
  if (intent === "inTotalRoom") {
    const data = await dialogflow.getAllRoom();
    const roomNames = data.map((room) => room.nameRoom); // Lấy danh sách tên phòng
    const roomNamesString = roomNames.join(", "); // Chuyển danh sách thành chuỗi
    return res.send({
      fulfillmentText: `Tổng cộng ở đây có hơn ${data.length} phòng bao gồm tất cả các loại phòng. Tên các loại phòng là: ${roomNamesString}.`,
    });
  }
  if (intent === "orderRoom - khuvuc") {
    const data = await dialogflow.findRoomsByIdSector(
      req.body.queryResult.parameters
    );
    const rooms = data.map(
      (room) =>
        `phòng ${room.nameRoom} - giá ${room.giaRoom}vnđ/Đêm - loại phòng : ${room.loaiRoom}.`
    );
    const roomListString = `Sau đây là danh sách các phòng cùng với giá phòng:  ${rooms.join(
      ", "
    )}. Bạn đã chọn được phòng ưng ý nào ạ ?`;
    return res.send({
      fulfillmentText: roomListString,
    });
  }

  if (intent === "orderRoom - khuvuc - confirmOrder") {
    const enTenPhong = parameters.enTenPhong;
    const enTen = parameters.enTen;
    const enNgayCheckIn = parameters.enNgayCheckIn;
    const enNgayCheckOut = parameters.enNgayCheckOut;
    const enSdt = parameters.enSdt;
    console.log(parameters);
    const room = await dialogflow.getInfoRoom({ idRoom: enTenPhong });
    console.log(room.nameRoom);
    function generateDateArrayWithTimezone(startTimestamp, endTimestamp) {
      const dateArray = [];
      let currentDate = new Date(startTimestamp);
      const lastDate = new Date(endTimestamp);

      while (currentDate <= lastDate) {
        const formattedDate = `${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${currentDate.getFullYear()}`;
        dateArray.push(formattedDate);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }

      return dateArray;
    }
    const arrayDate = generateDateArrayWithTimezone(
      enNgayCheckIn,
      enNgayCheckOut
    );
    console.log(arrayDate.length);
    const data = await dialogflow.orderRoomByChatBot(
     {
      "enTenPhong" : enTenPhong,
      "dateOrderRoom" : arrayDate,
      "enTen" : enTen.name,
      "enSdt" : enSdt,
      "totalMoney" : arrayDate.length * room.giaRoom
     }
    )
    console.log(data)
    return res.send({
      fulfillmentText: `Chào anh/chị ${enTen.name}!
                         Mình xin xác nhận thông tin đơn đặt phòng của mình lần nữa ạ. 
                        anh/chị/ ${enTen.name} đặt phòng ${room.nameRoom} ngày đến : ${
                        arrayDate[0]} ngày trả phòng :  ${arrayDate[arrayDate.length - 1]}.
                        Tổng số ngày là ${arrayDate.length}.
                        Tổng tiền  : ${arrayDate.length * room.giaRoom} 
                        Khi nhận phòng tại quầy vui lòng cung cấp tên và SĐT để nhận phòng hoặc mã đặt phòng : ${data.order.idOrder}
                        `,
    });
  }

  return res.send({
    fulfillmentText: "Lỗi máy chủ",
  });
});

module.exports = router;
