const express = require("express");
const dialogflow = require("../controllers/dialogflow.controller");

const router = express.Router();

router.post("", async (req, res) => {
  // console.log(req.body);
  const intent = req.body.queryResult.intent.displayName
  const parameters = req.body.queryResult.parameters


  // Hàm này sẽ liệt kê tất cả các phòng
  async function inTotalRoom() {
    try {
      const data = await dialogflow.getAllRoom();
      const rooms = data.map(
        (room) =>
          `phòng ${room.nameRoom} - giá ${room.giaRoom}vnđ/Đêm - loại phòng : ${room.loaiRoom}.`
      );
      return res.send({
        fulfillmentText : `Tổng cộng ở đây có hơn ${data.length} phòng bao gồm tất cả các loại phòng. Tên các phòng là: ${rooms} . Bạn đã chọn được phòng ưng ý nào ạ?`
      })
    } catch (error) {
      return res.send({
        fulfillmentText : "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn."
      })
    }
  }

  // Hàm này sẽ tìm phòng theo khu vực
  async function orderRoomBySector(agent) {
    try {
      const data = await dialogflow.findRoomsByIdSector(parameters);
      const rooms = data.map(
        (room) =>
          `phòng ${room.nameRoom} - giá ${room.giaRoom}vnđ/Đêm - loại phòng : ${room.loaiRoom}.`
      );
      const roomListString = `Sau đây là danh sách các phòng cùng với giá phòng: ${rooms.join(
        ", "
      )}. Bạn đã chọn được phòng ưng ý nào ạ?`;
    
      return res.send({
        fulfillmentText : roomListString
      })
    } catch (error) {
      return res.send({
        fulfillmentText :"Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn."
      })
    }
  }

  // Hàm này sẽ xác nhận đơn đặt phòng
  async function confirmOrderRoom(agent) {
    try {
      const { enTenPhong, enTen, enNgayCheckIn, enNgayCheckOut, enSdt } =
       parameters;
      //  console.log(parameters)
      const room = await dialogflow.getInfoRoom({ idRoom: enTenPhong });

      // Hàm này sẽ tạo một mảng các ngày từ ngày check-in đến ngày check-out
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
      const orderDetails = {
        enTenPhong,
        dateOrderRoom: arrayDate,
        enTen: enTen.name,
        enSdt,
        totalMoney: arrayDate.length * room.giaRoom,
      };

      const data = await dialogflow.orderRoomByChatBot(orderDetails);

      const confirmationMessage = `Chào anh/chị ${
        enTen.name
      }! Mình xin xác nhận thông tin đơn đặt phòng của mình lần nữa ạ.
        Anh/chị ${enTen.name} đặt phòng ${room.nameRoom} ngày đến: ${
        arrayDate[0]
      }, ngày trả phòng: ${arrayDate[arrayDate.length - 1]}.
        Tổng số ngày là ${arrayDate.length}.
        Tổng tiền: ${arrayDate.length * room.giaRoom}vnđ.
        Khi nhận phòng tại quầy, vui lòng cung cấp tên và SĐT để nhận phòng hoặc mã đặt phòng: ${
          data.order[data.order.length - 1].idOrder
        }.`;
      return res.send({
        fulfillmentText :   confirmationMessage
      })
    } catch (error) {
      return res.send({
        fulfillmentText :"Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn."
      })
    }
  }
  // hàm này lấy danh sách phòng
  async function listRooms(agent) {
    // console.log(agent.intent)
    try {
      const data = await dialogflow.getAllRoom();
      if (!Array.isArray(data) || !data.length) {
        return res.send({
          fullfilmentText: "Không có dữ liệu phòng.",
        });
      }
      // console.log(data);
      const rooms = data.map(
        (room) =>
          `phòng ${
            room.nameRoom
          } - giá ${room.giaRoom.toLocaleString()}vnđ/Đêm - loại phòng : ${
            room.loaiRoom
          }.`
      );
      const roomListString = `Sau đây là danh sách các phòng cùng với giá phòng: ${rooms.join(
        ", "
      )}. Bạn đã chọn được phòng ưng ý nào ạ?`;

      // agent.add(roomListString);
      return res.send({
        fulfillmentText: roomListString,
      });
    } catch (error) {
      return res.send({
        fullfilmentText :"Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn."
      })
    }
  }
  // thanh toán qua thẻ
  async function payOrderByBank() {
    try {
      const data = await dialogflow.updatePaypalOrder({ "idOrder": parameters.enIdOrder });
      console.log(data)
      if (!data || !data.order || !data.order.length) {
        return res.send({
          fulfillmentText: "Không có dữ liệu đơn đặt phòng.",
        });
      }
  
      // Tìm order con có idOrder khớp với idOrder được cung cấp
      const matchingOrder = data.order.find(order => order.idOrder === parameters.enIdOrder);
      if (!matchingOrder) {
        return res.send({
          fulfillmentText: "Không tìm thấy đơn đặt phòng với ID cung cấp.",
        });
      }
  
      // Tạo thông báo kết quả để trả về
      const result = `Xin chào ${matchingOrder.userInput}, đơn đặt phòng của bạn với ID: ${matchingOrder.idOrder} nếu được thanh toán qua ngân hàng thành công , chúng tôi sẽ liên hệ và xác nhận thông tin sớm nhất !.`;
  
      return res.send({
        fulfillmentText: result
      });
    } catch (error) {
      console.error(error);
      return res.send({
        fulfillmentText: "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn."
      });
    }
  }
  


  // Đây là hàm chính để xử lý các yêu cầu
  
    if(intent === "inTotalRoom")  {inTotalRoom()}
    if(intent === "orderRoom - khuvuc") {orderRoomBySector()}
    if(intent === "orderRoom - khuvuc - confirmOrder") {confirmOrderRoom()}
    if(intent === "orderRoom - tenPhong") {listRooms()}
    if(intent === "orderRoom - tenPhong - confirmOrder") {confirmOrderRoom()}
    if(intent === "inGiaPhong")  {inTotalRoom()}
    if(intent === "inThanhToan - yes")  {payOrderByBank()}
}
);

module.exports = router;
