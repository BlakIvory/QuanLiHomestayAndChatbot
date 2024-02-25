import React, { useEffect, useState } from "react";
import { apiGetInfoRoom } from "../services";
import { Image, Button } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import swal from "sweetalert";



require("./component.css");

const OrderRoomItem = (props) => {
  const [OrderRoom, setOrderRoom] = useState(props.order);
  const [Paypal, setPaypal] = useState(false)
  const [Room, setRoom] = useState({});
  const [current, setCurrent] = useState(0);
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    if (!OrderRoom || !OrderRoom.idRoom) return; // Kiểm tra xem OrderRoom có dữ liệu không

    const fetchInfoRoom = async () => {
      try {
        const data = await apiGetInfoRoom({ idRoom: OrderRoom.idRoom });
        const roomData = data.data[0];
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchInfoRoom();
    setAmount(Number(((OrderRoom.totalMoney/24000).toFixed(2))))
 
    console.log(OrderRoom);
  }, [OrderRoom, amount]);

  const handleClickPaypal = () => {
    setPaypal(!Paypal)
  }


  const handlePrevious = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : Room.imgRoom.length - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev < Room.imgRoom.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full  flex  rounded-lg bg-item mt-2 p-3">
      <div className="w-[25%] flex items-center justify-start ml-5">
        <div>
          {Room.imgRoom &&
            Room.imgRoom.length > 0 && ( // Kiểm tra xem có ảnh không
              <Image.PreviewGroup
              
              >
                <Image
                  className='rounded-md'
                  width={230}
                  height={180}
                  src={Room.imgRoom[current].secure_url}
                />
              </Image.PreviewGroup>
            )}
          <div className="flex justify-center items-center gap-3">
            <Button onClick={handlePrevious}>Trở lại</Button>
            <Button onClick={handleNext}>Kế Tiếp</Button>
          </div>
        </div>
      </div>

      <div className="w-[40%] col-1 gird  items-center ">
        <div className="flex w-full ">
         <div> Tên Phòng :{" "}</div>
          {Room.nameRoom && <div className="ml-2 ">{Room.nameRoom}</div>}{" "}
        </div>
        <div className="flex w-full ">
          <div>Loại phòng :{" "}</div>
          {Room.loaiRoom && <div className="ml-2 ">{Room.loaiRoom}</div>}{" "}
        </div>
        <div className="flex w-full ">
          <div>Khu vực :{" "}</div>
          {Room.idSectorRoom && <div className="ml-2 ">{Room.idSectorRoom}</div>}{" "}
        </div>
        <div className="flex w-full ">
          <div>Giá phòng :{" "}</div>
          {Room.giaRoom && <div className="ml-2 ">{Room.giaRoom}</div>} vnđ/đêm{" "}
        </div>
        {Paypal && (
          <div className="flex w-full ">
          <PayPalButton
              amount={amount}
              // options={{
              //   clientId: process.env.PAYPAL_CLIENT_ID
              // }}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                 swal(
                  "Thành Công ! ",
                  "Cảm ơn quý khách đã sử dụng dịch vụ ! ",
                  "success"
                );
                // OPTIONAL: Call your server to save the transaction
              }}
              onError={() => {
                swal(
                  "Báo lỗi ! ",
                  "Xảy ra lỗi trong quá trình thanh toán ! ",
                  "warning"
                );
              }}
            />
          </div>
        )}
      </div>
      <div className="w-[30%]">
        <div className="flex">
          Người sử dụng :
          {OrderRoom.userInput && <div className="ml-2">{OrderRoom.userInput}</div>}{" "}
        </div>
        <div className="flex">
          Số điện thoại :
          {OrderRoom.phoneInput && <div className="ml-2">{OrderRoom.phoneInput }</div>}{" "}
        </div>
        <div className="">
          Ngày đặt phòng :
          {OrderRoom.dateInput && OrderRoom.dateInput.length <= 3 &&
          <div className="ml-2">
            {OrderRoom.dateInput.map((date)=>(
              <div>{date}</div>
            ))}
          </div>
          }
          {OrderRoom.dateInput && OrderRoom.dateInput.length > 3 &&
          // <div className="ml-2">
          //   <div>{OrderRoom.dateInput[0]}</div>
          //   <div>.....</div>
          //   <div>{OrderRoom.dateInput[OrderRoom.dateInput.length-1]}</div>
          // </div>
          <div className="ml-2">
            {OrderRoom.dateInput && (
              OrderRoom.dateInput.map((date)=>(
                <div>{date}</div>
              ))
            )}
          </div>
          }
        </div>
        <div className="flex">
          Tổng tiền :
          {OrderRoom.totalMoney && <div className="ml-2">{OrderRoom.totalMoney}</div>} vnđ
        </div>
        <div className="flex">
          Trạng Thái Hóa đơn :
          { OrderRoom.pay==="false" && (<div className="ml-2">Chưa thanh toán</div>)} 
          { OrderRoom.pay==="true" && <div className="ml-2">Đã thanh toán</div>} 
        </div>
        <div className="flex mb-3">
          Trạng Thái đặt phòng :
          { OrderRoom.statusOrder==="1" && (<div className="ml-2">Chờ xác nhận</div>)} 
          { OrderRoom.statusOrder==="2" && <div className="ml-2">Đã xác nhận</div>} 
        </div>
        {/* {OrderRoom.statusOrder && OrderRoom.statusOrder === 1 && (
        <Button className="">Chờ Xác Nhận </Button>
        )}
        {OrderRoom.statusOrder && OrderRoom.statusOrder === 2 && (
          <Button className="">Đã Xác Nhận</Button>
        )} */}
        <div className="flex gap-2">
        {OrderRoom.pay && Paypal===false && OrderRoom.pay === "false" && (
          <Button className="btn_X" onClick={handleClickPaypal} >Thanh Toán Paypal</Button>
        )}
        {Paypal && (
          <Button className="btn_X" onClick={handleClickPaypal} >Hủy Thanh Toán Paypal</Button>
        )}
        {OrderRoom.statusOrder && OrderRoom.statusOrder === "1"  && (
          <Button className="btn_V">Hủy đặt Phòng</Button>
        )}
        </div>
      </div>
    </div>
  );
}

export default OrderRoomItem;
