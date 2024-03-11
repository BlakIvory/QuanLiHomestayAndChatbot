import React, { useEffect, useState } from "react";
import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import {
  apiConfirmOrderRoom,
  apiGetAllUser,
  apiGetInfoRoom,
  apiGetAllRoom,
  apiCompleteOrderRoom,
  apiDeleteOrderRoom,
} from "../../api";
import AddSectorForm from "../../components/AddSectorForm";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import swal from "sweetalert";
const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    apiGetAllUser().then((res) => {
      setDataSource(res.data.users);

      setLoading(false);
    });
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-const-assign
    if (dataSource.length > 0) {
      const allOrder = dataSource.reduce(
        (acc, user) => [...acc, ...user.order],
        []
      );
      setData(allOrder);
    }
  }, [dataSource]);
  // console.log(data)

  const handleClickConfirmOrder = async (payload) => {
    const result = await apiConfirmOrderRoom(payload);
    console.log(result.data);
    if (result.data.status === 1) {
      swal({
        title: "Thành Công!",
        text: result.data.msg,
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.reload();
      });
    }
  };
  const handleClickCompleteOrder = async (payload) => {
    const result = await apiCompleteOrderRoom(payload);
    console.log(result.data);
    if (result.data.status === 1) {
      swal({
        title: "Thành Công!",
        text: result.data.msg,
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.reload();
      });
    }
  };
  const handleClickDeleteOrder = async (payload) => {
    console.log(payload)
    const result = await apiDeleteOrderRoom(payload);
    console.log(result.data);
    if (result.data.status === 1) {
      swal({
        title: "Thành Công!",
        text: result.data.msg,
        icon: "success",
        button: "OK",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const [roomNames, setRoomNames] = useState({});
  const [roomIds, setRoomIds] = useState([]);
  const getApiGetInfo = async (idRoom) => {
    const res = await apiGetInfoRoom({ idRoom });
    const nameRoom = res.data[0].nameRoom;
    setRoomNames((prevRoomNames) => ({ ...prevRoomNames, [idRoom]: nameRoom }));
  };

  useEffect(() => {
    // Assuming you have a list of room IDs you want to fetch names for
    const fetchRooms = async () => {
      const res = await apiGetAllRoom();
      // console.log(object)
      // console.log(res.data.rooms[0])

      res.data.rooms.forEach((room) => {
        setRoomIds((prev) => [...prev, room._id]);
      });
    };
    fetchRooms();
    // const roomIds = ["65b377dfdc9b573d146614dd","65deda99215212200ab94206"];
    roomIds.forEach((id) => getApiGetInfo(id));
  }, [data]);





  return (
    <div className="p-5">
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>QUẢN LÝ ĐẶT PHÒNG</Typography.Title>
        <Table
          loading={loading}
          rowKey="idOrder"
          columns={[
            {
              title: "người sử dụng",
              dataIndex: "userInput",
            },
            {
              title: "số điện thoại",
              dataIndex: "phoneInput",
            },
            {
              title: "Tên phòng",
              dataIndex: "idRoom",
              render: (idRoom) => {
                // Use the roomNames state to access the room name
                const name = roomNames[idRoom];
                return <span>{name}</span>;
              },
            },
            {
              title: "ngày bắt đầu",
              dataIndex: "dateInput",
              render: (value) => <span>{value[0]}</span>,
            },
            {
              title: "số ngày",
              dataIndex: "dateInput",
              render: (value) => <span>{value.length}</span>,
            },
            {
              title: "Trạng thái",
              dataIndex: "statusOrder",
              render: (value) => {
                let status;
                switch (value) {
                  case "1":
                    status = "Chờ xác nhận";
                    break;
                  case "2":
                    status = "Đã xác nhận";
                    break;
                  case "3":
                    status = "Đã hoàn thành";
                    break;
                  case "10":
                    status = "Đã hủy đặt";
                    break;
                  default:
                    status = "Không xác định"; // hoặc bất kỳ trạng thái mặc định nào bạn muốn hiển thị
                }
                return <span>{status}</span>;
              },
            },
            {
              title: "Thanh toán",
              dataIndex: "pay",
              render: (value) => (
                <span>
                  {value === "true" ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              ),
            },
            {
              title: "Xác Nhận",
              dataIndex: "statusOrder",
              render: (value, record) => (
                <span>
                  {value === "1" && (
                    <Button
                      title="Xác nhận đơn đặt phòng"
                      className=" flex items-center justify-center"
                      style={{ fontSize: "18px", color: "green" }}
                      shape="round"
                      icon={<CheckCircleOutlined />}
                      onClick={() => {
                        handleClickConfirmOrder(record);
                      }}
                    >
                      Xác Nhận
                    </Button>
                  )}
                </span>
              ),
            },
            {
              title: "Xử lí",
              render: (index) => (
                <div className="flex justify-between">
                  {/* <UnorderedListOutlined
                    title="Xem chi tiết"
                    className="m-1 flex items-center justify-center"
                    style={{ fontSize: "20px", color: "green" }}
                    onClick={() => {}}
                  /> */}
                  <CheckCircleOutlined
                    title="Nhấn để hoàn thành đơn"
                    className="m-1 flex items-center justify-center"
                    style={{ fontSize: "20px", color: "blue" }}
                    onClick={() => {
                      // console.log(index)
                      handleClickCompleteOrder(index)
                    }}
                  />
                  <DeleteOutlined
                    title="Xóa đơn hàng"
                    className="m-1 flex items-center justify-center"
                    style={{ fontSize: "20px", color: "red" }}
                    onClick={() => {
                      // console.log(index)
                      handleClickDeleteOrder(index)
                    }}
                  />
                </div>
              ),
            },
          ]}
          dataSource={data}
          pagination={{
            pageSize: 6,
          }}
        ></Table>
      </Space>
    </div>
  );
};

export default Orders;
