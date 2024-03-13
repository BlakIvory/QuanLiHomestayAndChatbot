import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import icons from "../../ultils/icons";
// import { Image } from 'antd';
import '../containers.css'
const { CiSearch } = icons;

const Navigation = () => {
  const { IsLoggedIn, nameUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  



  return (
    <div className="w-full flex justify-center items-center h-[50px] bg-[#A64AC9] mt-2 navigationSticky">
      <div className="w-[800px] flex justify-between">
        <div className="navbars">
          <img
            className="rounded-full cursor-pointer"
            onClick={() => {
              navigate(path.TRANGCHU);
            }}
            width="68px"
            src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/02/homestay3.jpg"
            alt="logo"
          />
        </div>
        <div className="flex justify-center items-center  ">
         
            <div className="flex items-center rounded-lg gap-2 bg-white h-[40px]">
            <CiSearch className="ml-2" size={24} />
            <input
              placeholder="Nhập nơi cần tìm ..."
              onChange={(e) => {
                // console.log(e.target.value);
                // setSearchPlace(e.target.value);
              }}
            />
            </div>
          
        </div>
        <div className="flex justify-center items-center  ">
          <ul className="flex items-center justify-center gap-3 navbars font-semibold">
            <NavLink
              to="/trangchu"
              style={({ isActive }) => ({
                color: isActive ? "#FCCD04" : "white",
              })}
            >
              Trang Chủ
            </NavLink>
            <NavLink
              to="/gioithieu"
              style={({ isActive }) => ({
                color: isActive ? "#FCCD04" : "white",
              })}
            >
              Giới Thiệu
            </NavLink>
            <NavLink
              to="/xemphong"
              style={({ isActive }) => ({
                color: isActive ? "#FCCD04" : "white",
              })}
            >
              Xem Phòng
            </NavLink>
            {IsLoggedIn ? (
              <div className="navbars flex gap-3">
                <NavLink
                  to="/datphong"
                  style={({ isActive }) => ({
                    color: isActive ? "#FCCD04" : "white",
                  })}
                >
                  Đặt Phòng
                </NavLink>

                <NavLink
                  to="/canhan"
                  style={({ isActive }) => ({
                    color: isActive ? "#FCCD04" : "white",
                  })}
                >
                  Cá Nhân
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? "#FCCD04" : "white",
                })}
              >
                Đăng nhập để xem thêm
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
