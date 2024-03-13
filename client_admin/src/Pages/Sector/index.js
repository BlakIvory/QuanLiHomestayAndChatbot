import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Rate,
  Space,
  Table,
  Typography,
  Input,
  Button,
  Popconfirm,
  message,
  InputNumber,
} from "antd";
import { apiGetAllSector, apiDeleteAdmin } from "../../api";

import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import swal from "sweetalert";
import Highlighter from "react-highlight-words";
import AddSectorForm from "../../components/AddSectorForm";
const Sector = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [showAddSectorPopup, setShowAddSectorPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiGetAllSector().then((res) => {
      // console.log(res)
      setDataSource(res.data.sectors);
      setLoading(false);
    });
  }, []);

  const [searchText, setSearchText] = useState("");

  const searchInput = useRef();

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
    // console.log(record)
    setDataSource((prevData) => {
      console.log(prevData);
      const updatedData = prevData.map((item) => {
        if (item._id === record._id) {
          return {
            ...item,
            nameRoom: record.nameRoom,
            giaRoom: record.giaRoom,
            loaiRoom: record.loaiRoom,
          };
        }
        // console.log(item)
        return item;
      });
      return updatedData;
    });
    setEditingRow(null);
  };

  const handleEditClick = (record) => {
    setEditingRow(record._id);
  };

  return (
    <div className="p-5">
      {showAddSectorPopup && (
        <AddSectorForm
          setShowAddSectorPopup={setShowAddSectorPopup}
        ></AddSectorForm>
      )}
      <Space size={20} direction="vertical">
        <div className="flex justify-between">
          <Typography.Title level={4}>QUẢN LÝ KHU VỰC</Typography.Title>
          <Button
            className="bg-primary border text-green"
            size={40}
            icon={<PlusOutlined />}
            onClick={() => setShowAddSectorPopup(true)}
          >
            Thêm Khu Vực
          </Button>
        </div>
        <Table
          loading={loading}
          rowKey="_id"
          columns={[
            {
              title: "Tên khu vực",
              dataIndex: "nameSector",
              ...getColumnSearchProps("userSector"),
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
              title: "Đặt điểm khu vực ",
              dataIndex: "discSector",
              ...getColumnSearchProps("discSector"),
              sorter: (a, b) => a.userName.localeCompare(b.userName),
              render: (text, record) => {
                if (record._id === editingRow) {
                  return (
                    <Input
                      initValue={text}
                      onChange={(e) => {
                        if (e && e.target) {
                          console.log(e.target.value);
                        } else {
                          console.log("Event or target is undefined");
                        }
                      }}
                    />
                  );
                }
                return <span>{text.toLocaleString("vi-VN")}</span>;
              },
            },
            {
              title: "Vị trí",
              dataIndex: "addressSector",
              ...getColumnSearchProps("addressSector"),
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
              title: "Số lượng phòng",
              dataIndex: "totalRoomInSector",
              align: "center",
              render: (text, record) => {
                if (record._id === editingRow) {
                  return (
                    <InputNumber
                      initValue={text}
                      onChange={(e) => {
                        console.log(e)
                      }}
                    />
                  );
                }
                return <span>{text}</span>;
              },
            },
            {
              title: "tình trạng",
              dataIndex: "statusSector",
              align: "center",
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
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
        ></Table>
      </Space>
    </div>
  );
};

export default Sector;
