import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "antd";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import { path } from '../../ultils/constant'
import moment from "moment";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { DatePicker, Form, Input, Button, Radio, Space, Rate } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import PayButton from "../../components/PayButton";
import {
  LoginOutlined
} from '@ant-design/icons';
const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const DetailRoom = () => {
  const navigate = useNavigate()
  const { IsLoggedIn, nameUser, phoneUser } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  var {
    nameRoom,
    imgRoom,
    danhgiaRoom,
    loaiRoom,
    idSectorRoom,
    discRoom,
    orderRoom,
    giaRoom,
    cmtRoom,
  } = location.state.detailData;
  const [bigImg, setBigImg] = useState(imgRoom[0].secure_url);
  const [arrayDateInput, setArrayDateInput] = useState([]);


  const options = [
    { label: "thanh toán qua Paypal", value: "true" },
    { label: "Tiền mặt", value: "false" },
  ];

  const handleSetBigImg1 = () => {
    setBigImg(imgRoom[0].secure_url);
  };
  const handleSetBigImg2 = () => {
    setBigImg(imgRoom[1].secure_url);
  };
  const handleSetBigImg3 = () => {
    setBigImg(imgRoom[2].secure_url);
  };
  const dateFormat = "DD/MM/YYYY";
  function disabledDate(current) {
    // Can not select days after today
    return current && current < moment().endOf("day");
  }
  // Hàm nhận vào hai ngày dạng chuỗi (YYYY-MM-DD) và trả về một mảng chứa các ngày từ ngày bắt đầu đến ngày kết thúc
  function getDaysBetween(startDate, endDate) {
    // Sử dụng thư viện dayjs để làm việc với ngày tháng

    // Tạo hai đối tượng dayjs từ hai ngày đầu vào
    let start = dayjs(startDate);
    let end = dayjs(endDate);

    // Tạo một mảng rỗng để lưu kết quả
    let result = [];

    // Lặp từ ngày bắt đầu đến ngày kết thúc
    while (start.isBefore(end) || start.isSame(end)) {
      // Thêm ngày hiện tại vào mảng kết quả
      result.push(start.format("DD/MM/YYYY"));

      // Tăng ngày hiện tại lên một ngày
      start = start.add(1, "day");
    }

    // Trả về mảng kết quả
    setArrayDateInput(result);
  }
  
  const submitFormOrder = () => {
    console.log("form");
  };

  return (
    <div className=" m-1 w-1100 ">
      <div className="font-semibold flex justify-center w-1100 text_bigSize1">
        Chi Tiết Phòng Homestay
      </div>
      <div className="">
        <div className="flex">
          {/* img preview */}
          <div className="flex w-[720px]">
            {/* img lon */}
            <div className="m-1  w-[500px] ">
              <Image
                className="rounded-md"
                src={bigImg}
                height={400}
                width={500}
              />
            </div>
            {/* dong img lon */}
            {/* img nho */}
            <div className="m-1 b w-[200px] column-1 h-[400px] align-middle">
              <div onClick={handleSetBigImg1}>
                <Image
                  preview={false}
                  className=" cursor-pointer rounded-md"
                  src={imgRoom[0].secure_url}
                  height={100}
                  width={200}
                />
              </div>
              <div onClick={handleSetBigImg2}>
                <Image
                  preview={false}
                  className=" cursor-pointer rounded-md"
                  src={imgRoom[1].secure_url}
                  height={100}
                  width={200}
                />
              </div>
              <div onClick={handleSetBigImg3}>
                <Image
                  preview={false}
                  className=" cursor-pointer rounded-md"
                  src={imgRoom[2].secure_url}
                  height={100}
                  width={200}
                />
              </div>
              <div className="w-full mt-3 ">
                <div className="w-[200px] flex justify-center">
                  <TbSquareRoundedArrowUpFilled size={30} width={60} />
                </div>
                <div className="w-[200px] flex justify-center">
                  Nhấn để xem trước
                </div>
              </div>
            </div>
            {/* dong img nho */}
          </div>
          {/* dong img preview */}
          {/* card thanh toán */}
          <div className=" m-1 w-[400px] z rounded-lg ">
            <Form
              layout="vertical"
              onFinish={submitFormOrder}
              labelCol={{
                span: 200,
              }}
              style={{
                maxWidth: 500,
              }}
            >
              <div className="font-semibold flex justify-around text_bigSize1">
                Đặt Phòng
              </div>
              <div className="flex justify-around items-center">
                <Form.Item
                  label="Tên người Đặt :"
                  initialValues={`${nameUser}`}
                  name="nameUser"
                  className="w-[80%]"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin người đặt !",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên người đặt ..." />
                </Form.Item>
              </div>
              <div className="flex justify-around items-center">
                <Form.Item
                  label="Số Điện Thoại :"
                  name="phoneUser"
                  className="w-[80%]"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin người đặt !",
                    },
                  ]}
                >
                  <Input placeholder="Nhập SĐT người đặt ..." />
                </Form.Item>
              </div>
              <div className="flex justify-around items-center">
                <Form.Item
                  label="Nhập ngày ở :"
                  name="dateOrder"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin ngày đặt !",
                    },
                  ]}
                >
                  <RangePicker
                    className=""
                    disabledDate={disabledDate}
                    placeholder={["Ngày Đi", "Ngày Về"]}
                    initialValues={[
                      dayjs(`${moment().format("DD/MM/YYYY")}`, dateFormat),
                      dayjs(`${moment().format("DD/MM/YYYY")}`, dateFormat),
                    ]}
                    format={dateFormat}
                    onChange={(e) => {
                      if (e) {
                        getDaysBetween(e[0].$d, e[1].$d);
                      }
                    }}
                  />
                </Form.Item>
              </div>
              <div className=" flex w-full justify-around">
                <div className=" flex justify-center items-center">
                  Số ngày : {arrayDateInput.length}
                </div>
                <div className=" flex justify-center items-center">
                  Đơn giá phòng : {giaRoom.toLocaleString()} VNĐ
                </div>
              </div>
              <div className=" flex w-full justify-around">
                <div className=" flex justify-center items-center text_bigSize2">
                  Tổng tiền phòng :{" "}
                  {(arrayDateInput.length * giaRoom).toLocaleString()} VNĐ
                </div>
              </div>
              <div className="ml-4  text-sm">
                <div className="  flex  items-center">
                  * Vui Lòng đọc kĩ thông tin đặt phòng
                </div>
                <div className="  flex  items-center">
                  * Vui lòng kiểm tra thông tin ngày đi và ngày về
                </div>
                <div className="  flex  items-center pr-2">
                  * Thời gian Checkin và Checkout là 11h trưa hôm trước và 11h
                  trưa hôm sau
                </div>
                <div className="   flex justify-center  items-center pr-4">
                  * Trường hợp đã thanh toán qua Paypal, quý khách muốn hủy đặt
                  phòng, Xin liên hệ qua hostline để hoàn tiền
                </div>
              </div>
              {IsLoggedIn ? (
                 <PayButton/>
              ):(
                <div className="w-full flex justify-center icons-center mt-5 mb-5">
                  <Button danger type="text"   icon={<LoginOutlined />} size={40}>
                Đăng Nhâp để tiếp tục
              </Button>
                </div>
              )}
             

            </Form>
          </div>
          {/* đóng card */}
        </div>
        <div className="bg-black w-1100 h-[2px] mt-5 mb-5 flex justify-center items-center"></div>
        <div className="detailRoom_Charactic w-1100  ">
          <div>{nameRoom}</div>
          <div>
            <Rate value={danhgiaRoom} disabled allowHalf />
          </div>
          <div>{discRoom}</div>
        </div>
        <div className="bg-black w-1100 h-[2px] mt-5 mb-5 flex justify-center items-center"></div>
        <div className="comment_box w-1100  ">
          <div>Bình Luận</div>
     
          {cmtRoom.length === 0 ? (
            <div className=" comment_box">
              <div>Chưa có bình luận nào ... </div>
              <div>Hãy góp ý để HOMESTAY24H hoàn thiện hơn nhé ! </div>
            </div>
          ) : (
            <div>
              {cmtRoom?.map( cmt => 
                <div className=" comment_box">
                  <div>
                    <Rate value={cmt.rate} disabled allowHalf />
                  </div>
                  <div>{cmt.content}</div>
                </div>
              )
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;
