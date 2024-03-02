import React, { useEffect, useState } from "react";
import { apiCancleRoom, apiGetInfoRoom, apiUpdatePaypalOrder } from "../services";
import { Image, Button } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import swal from "sweetalert";
import Modal from "react-modal";

Modal.setAppElement("#root");

require("./component.css");

const OrderRoomItem = (props) => {
  const [OrderRoom, setOrderRoom] = useState(props.order);
  const [Paypal, setPaypal] = useState(false);
  const [Room, setRoom] = useState({});
  const [current, setCurrent] = useState(0);
  const [amount, setAmount] = useState(0);
  
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
    setAmount(Number((OrderRoom.totalMoney / 24000).toFixed(2)));

    // console.log(OrderRoom);
  }, [OrderRoom, amount]);

  const handleClickPaypal = () => {
    setPaypal(!Paypal);
  };
  const CallApiUpdatePayOrder = async()=>{
      const result = await apiUpdatePaypalOrder(
        {idUser : OrderRoom.idUser,
        idOrder : OrderRoom.idOrder,
        })
      if(result.status ===200) return true;
      if(result.status !==200) return false;
  }


  const handleClickCancelOrder = async() => {
    console.log("object")
    const result =  await apiCancleRoom(OrderRoom)
    console.log(result)
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
              <Image.PreviewGroup>
                <Image
                  className="rounded-md"
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
          <div> Tên Phòng : </div>
          {Room.nameRoom && <div className="ml-2 ">{Room.nameRoom}</div>}{" "}
        </div>
        <div className="flex w-full ">
          <div>Loại phòng : </div>
          {Room.loaiRoom && <div className="ml-2 ">{Room.loaiRoom}</div>}{" "}
        </div>
        <div className="flex w-full ">
          <div>Khu vực : </div>
          {Room.idSectorRoom && (
            <div className="ml-2 ">{Room.idSectorRoom}</div>
          )}{" "}
        </div>
        <div className="flex w-full ">
          <div>Giá phòng : </div>
          {Room.giaRoom && (
            <div className="ml-2 ">{Room.giaRoom}</div>
          )} vnđ/đêm{" "}
        </div>
       
      </div>
      <div className="w-[30%]">
        <div className="flex">
          Người sử dụng :
          {OrderRoom.userInput && (
            <div className="ml-2">{OrderRoom.userInput}</div>
          )}{" "}
        </div>
        <div className="flex">
          Số điện thoại :
          {OrderRoom.phoneInput && (
            <div className="ml-2">{OrderRoom.phoneInput}</div>
          )}{" "}
        </div>
        <div className="">
          Ngày đặt phòng :
          {OrderRoom.dateInput && OrderRoom.dateInput.length <= 3 && (
            <div className="ml-2">
              {OrderRoom.dateInput.map((date,index) => (
                <div key={index}>{date}</div>
              ))}
            </div>
          )}
          {OrderRoom.dateInput && OrderRoom.dateInput.length > 3 && (
            // <div className="ml-2">
            //   <div>{OrderRoom.dateInput[0]}</div>
            //   <div>.....</div>
            //   <div>{OrderRoom.dateInput[OrderRoom.dateInput.length-1]}</div>
            // </div>
            <div className="ml-2">
              {OrderRoom.dateInput.map((date,index) => <div key={index}>{date}</div>)}
            </div>
          )}
        </div>
        <div className="flex">
          Tổng tiền :
          {OrderRoom.totalMoney && (
            <div className="ml-2">{OrderRoom.totalMoney}</div>
          )}{" "}
          vnđ
        </div>
        <div className="flex">
          Trạng Thái Hóa đơn :
          {OrderRoom.pay === "false" && (
            <div className="ml-2">Chưa thanh toán</div>
          )}
          {OrderRoom.pay === "true" && (
            <div className="ml-2">Đã thanh toán</div>
          )}
        </div>
        <div className="flex mb-3">
          Trạng Thái đặt phòng :
          {OrderRoom.statusOrder === "1" && (
            <div className="ml-2">Chờ xác nhận</div>
          )}
          {OrderRoom.statusOrder === "2" && (
            <div className="ml-2">Đã xác nhận</div>
          )}
           {OrderRoom.statusOrder === "10" && (
            <div className="ml-2">Đã Hủy Đặt</div>
          )}
        </div>
        {/* {OrderRoom.statusOrder && OrderRoom.statusOrder === 1 && (
        <Button className="">Chờ Xác Nhận </Button>
        )}
        {OrderRoom.statusOrder && OrderRoom.statusOrder === 2 && (
          <Button className="">Đã Xác Nhận</Button>
        )} */}

       

        <div className="flex gap-2">
          {OrderRoom.pay && OrderRoom.statusOrder !== "10" && Paypal === false && OrderRoom.pay === "false" && (
            <Button className="btn_X" onClick={handleClickPaypal}>
              Thanh Toán Paypal
            </Button>
          )}
          {Paypal && (
            <Button className="btn_X" onClick={handleClickPaypal}>
              Hủy Thanh Toán Paypal
            </Button>
          )}
          {OrderRoom.statusOrder && OrderRoom.statusOrder === "1" && (
            <div>
              <Button className="btn_V" 
              onClick={()=>{
                // swal({
                //   title: "Bạn có chắc chắn hủy đặt phòng",
                //   text: "Bạn sẽ không thể hoàn tác quá trình này! , trường hợp đã thanh toán vui lòng liên hệ hotline để nhận lại tiền !  ",
                //   type: "warning",
                //   showCancleButton : true,
                //   confirmButtonCorlor : "#17E9E0",
                //   confirmButtonText  : "Hủy đặt phòng .",
                //   closeOnConfirm : false,
                // },
                // function (){
                //   swal("Đã hủy !", "Quá trình đặt phòng đã được hủy", "success",)
                // })
                swal({
                  title: "Bạn có chắc không?",
                  text: "Bạn sẽ không thể khôi phục lại tệp này!",
                  icon: "warning",
                  buttons: ['Trở Về', 'Hủy Đặt'],
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                    handleClickCancelOrder()
                    swal("Tệp của bạn đã được xóa!", {
                      icon: "success",
                    });
                  } 
                });
              }} >
                Hủy đặt Phòng
              </Button>
              
            </div>
          )}
          
        </div>
        {Paypal && (
          <div className=" w-[280px] mt-5 ">
            <PayPalButton
              amount={amount}
              // options={{
              //   clientId: process.env.PAYPAL_CLIENT_ID
              // }}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                const res = CallApiUpdatePayOrder()
                
                if(res) {
                  swal(
                    "Thành Công ! ",
                    "Cảm ơn quý khách đã sử dụng dịch vụ ! ",
                    "success"
                  );
                  window.location.reload()
                }
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
    </div>
  );
};

export default OrderRoomItem;
