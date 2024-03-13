import React, { useState, useEffect, useRef } from "react";

import {
  Avatar,
  Button,
  Rate,
  Space,
  Table,
  Typography,
  Input,
  Popconfirm,
  Form,
  Select,
  message,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import swal from "sweetalert";
import AddAdminForm from "../../components/AddAdminForm";
import Highlighter from "react-highlight-words";
import { apiDeleteAdmin, apiGetAllAdmin } from "../../api";
const { Option } = Select;
const NhanVien = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");

  const searchInput = useRef();
  useEffect(() => {
    const fetch = async () => {
      const response = await apiGetAllAdmin();
      setDataSource(response.data.admins);
    };
    fetch();
    // console.log(dataSource)
  }, []);

  const [showAddFormAdminPopup, setShowAddFormAdminPopup] = useState(false);

  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Tìm kiếm ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Đặt lại
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (open) => {
        if (open) {
          setTimeout(() => searchInput.current.select());
        }
      },
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    };
  };

  const [editingRow, setEditingRow] = useState(null);

  const handleSaveClick = (record) => {
    // Lưu các giá trị đã chỉnh sửa vào backend hoặc cập nhật state
    // Để đơn giản, chúng ta chỉ cập nhật state
    setDataSource((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item._id === record._id) {
          return {
            ...item,
            nameRoom: record.nameRoom,
            giaRoom: record.giaRoom,
            loaiRoom: record.loaiRoom,
          };
        }
        return item;
      });
      return updatedData;
    });
    setEditingRow(null);
  };

  const handleEditClick = (record) => {
    setEditingRow(record._id);
  };

  const columns = [
    {
      title: "Họ Tên",
      width: 200,
      dataIndex: "userName",
      ...getColumnSearchProps("userName"),
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      render: (text, record) => {
        if (record._id === editingRow) {
          return (
            <Input
              defaultValue={text}
              onChange={(e) => console.log(e.target.value)}
            />
          );
        }
        return <span>{text.toLocaleString("vi-VN")}</span>;
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text) => <Avatar src={text} />,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      render: (text, record) => {
        if (record._id === editingRow) {
          return (
            <Input
              defaultValue={text}
              onChange={(e) => console.log(e.target.value)}
            />
          );
        }
        return <span>{text.toLocaleString("vi-VN")}</span>;
      },
    },
    {
      title: "Năm Sinh",
      dataIndex: "birthYear",
      sorter: (a, b) => a.birthYear - b.birthYear,
      align: "center",
      render: (text, record) => {
        if (record._id === editingRow) {
          return (
            <Input
              defaultValue={text}
              onChange={(e) => console.log(e.target.value)}
            />
          );
        }
        return <span>{text.toLocaleString("vi-VN")}</span>;
      },
    },
    {
      title: "Tài Khoản",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      render: (text, record) => {
        if (record._id === editingRow) {
          return (
            <Input
              defaultValue={text}
              onChange={(e) => console.log(e.target.value)}
            />
          );
        }
        return <span>{text.toLocaleString("vi-VN")}</span>;
      },
    },
    {
      title: "Mật Khẩu",
      dataIndex: "password",
      render: (text, record) => {
        if (record._id === editingRow) {
          return (
            <Input
              defaultValue={text}
              onChange={(e) => console.log(e.target.value)}
            />
          );
        }
        return <span>{text.toLocaleString("vi-VN")}</span>;
      },
    },
    {
      title: "Quyền Admin",
      dataIndex: "isAdmin",
      align: "center",
      render: (text, record) => {
        if (record._id === editingRow) {
          return (
            <Select
              defaultValue={text ? "true" : "false"}
              style={{ width: 120 }}
              onChange={(value) => console.log(value)}
            >
              <Option value="true">Quản Lý</Option>
              <Option value="false">Nhân Viên</Option>
            </Select>
          );
        }
        return <span>{text ? "Quản Lý" : "Nhân Viên"}</span>;
      },
      filters: [
        { text: "Quản Lý", value: true },
        { text: "Nhân Viên", value: false },
      ],
      onFilter: (value, record) => record.isAdmin === value,
    },
    {
      title: "Chỉnh sửa",
      render: (_, record) => {
        if (record._id === editingRow) {
          return (
            <div className="flex">
              <SaveOutlined
                className="m-1 flex items-center justify-center"
                style={{ fontSize: "20px", color: "green" }}
                onClick={() => handleSaveClick(record)}
              >
                Lưu
              </SaveOutlined>
            </div>
          );
        }
        return (
          <div className="flex">
            <EditOutlined
              className="m-1 flex items-center justify-center"
              style={{ fontSize: "20px", color: "green" }}
              onClick={() => {
                // console.log(record._id);
                handleEditClick(record);
              }}
            >
              Chỉnh sửa
            </EditOutlined>
            <Popconfirm
              okType="danger"
              //  okButtonProps={{ style: {  backgroundColor: 'red'  }}}
              title="Bạn có chắc chắn muốn xóa không?"
              onConfirm={async () => {
                console.log(record);
                const result = await apiDeleteAdmin(record);
                if (result.status === 0) {
                  swal("Thành Công !", result.msg, "success");
                } else {
                  message.error("Có lỗi xảy ra!");
                }
              }}
              onCancel={() => {
                console.log("Hủy bỏ thao tác xóa");
              }}
              okText="Có"
              cancelText="Không"
            >
              <DeleteOutlined
                className="m-1 flex items-center justify-center"
                style={{ fontSize: "20px", color: "red" }}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="m-5">
      {showAddFormAdminPopup && (
        <AddAdminForm closeForm={() => setShowAddFormAdminPopup(false)} />
      )}
      <Space size={20} direction="vertical">
        <div className="flex justify-between">
          <Typography.Title level={4}>QUẢN LÝ NHÂN VIÊN</Typography.Title>
          <Button
            className="bg-primary border text-green"
            size={40}
            icon={<PlusOutlined />}
            onClick={() => {
              setShowAddFormAdminPopup(true);
            }}
          >
            Thêm Nhân Viên
          </Button>
        </div>
        <Table
          pagination={{
            pageSize: 6,
          }}
          rowKey="_id"
          dataSource={dataSource}
          columns={columns}
          bordered
        />
      </Space>
    </div>
  );
};

export default NhanVien;
