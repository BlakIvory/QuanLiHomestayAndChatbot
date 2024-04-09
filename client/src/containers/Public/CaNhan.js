import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Avatar } from "antd";
import { apiInfoUser, apiUpdateInfoUser } from "../../services/auth";
import { useSelector } from "react-redux";
import { Typography, Space, Image } from "antd";
import { Input, Button } from "antd";
import { Upload } from "antd";
import swal from "sweetalert";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
require("../containers.css");
const { Content } = Layout;
const { Text } = Typography;
const CaNhan = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { IsLoggedIn, phoneUser, idUser } = useSelector((state) => state.auth);

  const [editInfo, setEditInfo] = useState(false);

  const [Avatar, setAvatar] = useState(
    "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
  );
  useEffect(() => {
    // Gọi API từ máy chủ
    apiInfoUser({ phone: phoneUser }).then((res) => {
      // console.log(res.data);
      if (res.data.img.secure_url) {
        setAvatar(res.data.img.secure_url);
      }
      const result = res.data;
      setUserInfo(result);
    });
  }, []);
  // hiện lên password
  const [updateInfo, setUpdateInfo] = useState({
    idUser: idUser,
    email: "",
    phone: "",
    name: "",
    password: "",
    img: "",
  });
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG file!");
      swal(
        "Cảnh báo !",
        "Bạn không thể tải tệp không phải hình ảnh ! Vui lòng xóa tệp và tải lại",
        "warning"
      );
    }
    return isJpgOrPng;
  }

  const uploadImage = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e);
    formdata.append("upload_preset", "btj12veg");
    await axios
      .post("https://api.cloudinary.com/v1_1/doqqlyjb2/image/upload", formdata)
      .then((response) => {
        // console.log(response.data);
        setUpdateInfo({ ...updateInfo, img: response.data });
        // setFormData({...formData,imgRoom : selectedFile});
        setAvatar(response.data.secure_url);
        // console.log(formData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleClickUpdateInfo = async () => {
    const result = await apiUpdateInfoUser(updateInfo);
    console.log(result.data)
    if(result.data.status==="1") swal("Thành Công !" , result.data.msg, "success").then(()=>{window.location.reload()})
    // console.log(result);
  };

  return (
    <Layout className="w-1100 h-[600px] backround_profile ">
      <Content style={{ padding: "30px" }}>
        <Row gutter={16}>
          {/* Left column (avatar) */}
          <Col
            span={8}
            className="flex justify-center items-center cursor-pointer"
          >
            {Avatar ===
            "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png" ? (
              <Image
                className="avata_profile"
                preview={false}
                src={Avatar}
                alt="Avatar"
                style={{
                  width: "250px",
                  height: "250px",
                  position: "relative",
                }}
              />
            ) : (
              <Image
                className="avata_profile"
                src={Avatar}
                alt="Avatar"
                style={{
                  width: "250px",
                  height: "250px",
                  position: "relative",
                }}
              />
            )}
            {editInfo && (
              <div className="flex justify-center items-center  button_upload_avatar">
                <Upload
                  className="flex items-center justify-center asd"
                  beforeUpload={beforeUpload}
                  customRequest={dummyRequest}
                  action={uploadImage}
                  maxCount="3"
                  listType="picture-circle"
                  showUploadList={false}
                >
                  <PlusOutlined />
                  <div>Tải ảnh</div>
                </Upload>
              </div>
            )}
          </Col>

          {/* Right column (personal information) */}
          <Col span={16}>
            <Typography.Title
              level={1}
              style={{
                margin: 0,
                textAlign: "center",
                fontSize: "24px", // Đặt kích thước phông chữ lớn hơn (ví dụ: 24px)
              }}
            >
              Thông Tin Cá Nhân
            </Typography.Title>

            <div className="mt-1 mb-5">
              <div className="">
                <Typography.Title
                  level={3}
                  style={{
                    margin: 0,
                  }}
                >
                  Thông tin liên hệ :
                </Typography.Title>
              </div>
              <hr
                className="mt-2 mb-2"
                style={{ height: "2px", backgroundColor: "gray" }}
              />
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                    }}
                  >
                    Email :
                  </Typography.Title>
                  {editInfo ? (
                    <Input
                      defaultValue={userInfo && userInfo.email}
                      onChange={(e) =>
                        setUpdateInfo({ ...updateInfo, email: e.target.value })
                      }
                    />
                  ) : (
                    <div>{userInfo && userInfo.email}</div>
                  )}
                </Col>
                <Col span={12}>
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                    }}
                  >
                    Số điện thoại :
                  </Typography.Title>
                  {editInfo ? (
                    <Input
                      defaultValue={userInfo && userInfo.phone}
                      onChange={(e) =>
                        setUpdateInfo({ ...updateInfo, phone: e.target.value })
                      }
                    />
                  ) : (
                    <div>{userInfo && userInfo.phone}</div>
                  )}
                </Col>
              </Row>
            </div>
            <div>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                }}
              >
                Thông tin cá nhân :
              </Typography.Title>
            </div>

            <hr
              className="mt-2 mb-2"
              style={{ height: "2px", backgroundColor: "gray" }}
            />
            <Row gutter={16}>
              <Col span={12}>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                  }}
                >
                  Họ và Tên :
                </Typography.Title>
                {editInfo ? (
                  <Input
                    defaultValue={userInfo && userInfo.name}
                    onChange={(e) =>
                      setUpdateInfo({ ...updateInfo, name: e.target.value })
                    }
                  />
                ) : (
                  <div>{userInfo && userInfo.name}</div>
                )}
              </Col>
              <Col span={12}>
                <Typography.Title
                  level={5}
                  style={{
                    margin: 0,
                  }}
                >
                  Địa chỉ :
                </Typography.Title>
                {editInfo ? (
                  <Input
                    defaultValue={userInfo && userInfo.address}
                    onChange={(e) =>
                      setUpdateInfo({ ...updateInfo, address: e.target.value })
                    }
                  />
                ) : (
                  <div>{userInfo && userInfo.address}</div>
                )}
              </Col>
            </Row>
            <hr
              className="mt-2 mb-2"
              style={{ height: "2px", backgroundColor: "gray" }}
            />
            
            {editInfo ?
            <div>
              <Button
            className="ml-4"
        
            onClick={() => {
              handleClickUpdateInfo();
              setEditInfo((prev) => !prev);
            }}
          >
            Lưu
          </Button>
          <Button
            className="ml-4"
            danger
            onClick={() => {
              
              setEditInfo((prev) => !prev);
            }}
          >
            Hủy
          </Button>
            </div>
            :<Button
            className="bg-blue-300"
            onClick={() => {
              setEditInfo((prev) => !prev);
             
            }}
          >
            Cập nhật thông tin
          </Button>
          }
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CaNhan;
