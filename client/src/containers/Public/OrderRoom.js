import React, { useEffect, useState } from "react";
import { apiInfoUser } from "../../services";
import { useSelector } from "react-redux";
import ListOrderRoom from "../../components/ListOrderRoom";
import icons from "../../ultils/icons";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Select, Slider } from "antd";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const { RangePicker } = DatePicker;

const { CiSearch } = icons;
const OrderRoom = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const { IsLoggedIn, nameUser, phoneUser, idUser } = useSelector(
    (state) => state.auth
  );
 
  const [searchPlace, setSearchPlace] = useState("");

  const validateDate = (data) => {
    let d = new Date(data);
    let date = new Date(d); // chuyển chuỗi thành đối tượng Date
    let year = date.getFullYear(); // lấy năm
    let month = date.getMonth() + 1; // lấy tháng (từ 0 đến 11)
    let day = date.getDate(); // lấy ngày
    let formattedDate = day + "/" + month + "/" + year; // định dạng ngày theo YYYY-MM-DD
    // console.log(formattedDate);
    return formattedDate.toString();
  };
  const [inputData, setInputData] = useState({
    place: searchPlace,
    dateStart: validateDate(new Date()),
    dateEnd: validateDate(new Date()),
    loaiPhong: "1-2 người",
  });
  const handleChangeSelect = (value) => {
    inputData.loaiPhong = value;
    // console.log(inputData)
  };
  const handleSubmitSearch = (value) => {
    //goi API để search
    console.log(inputData);
  };
  const handleChangeDate = (data) => {
    if (data !== null) {
      const dateStart = validateDate(data[0].$d);
      // console.log(dateStart)
      const dateEnd = validateDate(data[1].$d);
      // console.log(dateStart)
      inputData.dateStart = dateStart;
      inputData.dateEnd = dateEnd;
    }
    // console.log(inputData)
  };

  const getOrderInfo = async () => {
    const res = await apiInfoUser({ phone: phoneUser });
    const result  = res.data.order
    return result
  };
  function disabledDate(current) {
    // Can not select days after today
    return current && current < moment().endOf("day");
  }

  useEffect(() => {
    const fetchInfoOrder = async ( )=>{
      const data = await getOrderInfo()
      setDataOrder(data)
    }
    fetchInfoOrder()
    // console.log(dataOrder)
  }, []);

  return (
    <div className="w-1100 ">
      <div className="font-semibold text-[25px] flex justify-center items-center">
        Thông tin các phòng đã đặt
      </div>
      <div>
        <div className="h-[70px] w-full rounded-md bg-slate-500 searchRooms flex justify-center items-center">
          <div className="flex items-center">
            <CiSearch className="ml-2" size={24} />
            <input
              placeholder="Nhập nơi cần tìm ..."
              onChange={(e) => {
                // console.log(e.target.value);
                setSearchPlace(e.target.value);
              }}
            />
          </div>
          <RangePicker
            className="w-[300px]   "
            disabledDate={disabledDate}
            defaultValue={[
              dayjs(`${moment().format("DD/MM/YYYY")}`, dateFormat),
              dayjs(`${moment().format("DD/MM/YYYY")}`, dateFormat),
            ]}
            placeholder={["Ngày Đi", "Ngày Về"]}
            format={dateFormat}
            onChange={(e) => {
              handleChangeDate(e);
            }}
          />

          <Select
            className="round-md"
            defaultValue="1-2 người"
            style={{ width: 150 }}
            onChange={handleChangeSelect}
            options={[
              {
                label: "Loại Phòng",
                options: [
                  { label: "1-2 người", value: "1-2 người" },
                  { label: "3-4 người", value: "3-4 người" },
                  { label: "5-6 người", value: "5-6 người" },
                ],
              },
            ]}
          />

          <button className="searchRoomsButton" onClick={handleSubmitSearch}>
            Tìm
          </button>
        </div>
      </div>
      <div>
        <ListOrderRoom dataOrder={dataOrder}></ListOrderRoom>
      </div>
    </div>
  );
};

export default OrderRoom;
