import React, { useEffect, useState } from "react";
import { apiInfoUser } from "../../services";
import { useSelector } from "react-redux";

const OrderRoom = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const { IsLoggedIn, nameUser, phoneUser, idUser } = useSelector(
    (state) => state.auth
  );



  const getOrderInfo = async () => {
    const res = await apiInfoUser({phone: phoneUser});
    console.log(res)
 
  };

  useEffect(() => {
    getOrderInfo();
    // console.log(dataOrder)
  }, []);

  return <div>Thông tin các phòng đã đặt</div>;
};

export default OrderRoom;
