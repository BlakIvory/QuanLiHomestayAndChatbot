import React,{useEffect, useState, }  from "react";
import { apiGetInfoRoom } from "../services";

require("./component.css");
const OrderRoomItem = (props) => {
  const [OrderRoom, setOrderRoom] = useState(props.order)
  
  const [Room, setRoom] = useState({})
  // console.log(OrderRoom)
  const getInfoRoom= async ( ) =>{
    const response = await apiGetInfoRoom({"idRoom" : OrderRoom.idRoom})
    // console.log(response.data[0]) 
    const data = response.data[0]
    return data
  }

  useEffect(() => {
  setOrderRoom(props.order)
  const fetchInfoRoom = async () => {
    const data = await getInfoRoom();
    setRoom(data);
  };
  fetchInfoRoom();
  }, [])



  return (
    <div className="w-full flex h-[200px] rounded-lg bg-item mt-2 p-3">
      <div className="w-[50%]">
        {Room.nameRoom}
        <div></div>
      </div>

      <div className="w-[50%]">
        <div>order info</div>
        <div> thanh toán</div>
      </div>
    </div>
  );
};

export default OrderRoomItem;
