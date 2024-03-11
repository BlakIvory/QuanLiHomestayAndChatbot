import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, ShopFilled, ShoppingCartOutlined,HomeOutlined, UserOutlined,MenuFoldOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from 'react-router-dom';
import './SideMenu.css';
const SideMenu = () => {
  const navigate = useNavigate()
  const { IsLoggedIn , isAdmin} = useSelector(state => state.auth)
  return (
    <div className='SideMenu h-full  '>
     <Menu 
     className='hg'
     onClick={(item)=>{
      //item.key
      // console.log("object")
      navigate(item.key)
     }}
     theme='dark'
     items={[
      {label : "",
      
    },
      {label : "Quản Lý DashBoard",
      icon : <AppstoreOutlined/>,
      key : "/",
    },
    {label : "Quản Lý Tài Khoản",
      key : "/customers",
      icon : <UserOutlined></UserOutlined>
    },
    {label : "Quản Lý Đặt Phòng",
      key : "/orders",
      icon : <ShoppingCartOutlined></ShoppingCartOutlined>
    },
    {label : "Quản Lý Phòng",
      key : "/rooms",
      icon : <HomeOutlined />
    },
    {label : "Quản Lý Khu Vực",
      key : "/sectors",
      icon : <MenuFoldOutlined></MenuFoldOutlined>
    },
    // {label : "Quản lý Nhân Viên",
    //   key : "/nhanvien",
    //   icon : <UsergroupAddOutlined />,
    // },

    ...(isAdmin ? [{
      label: "Quản lý Nhân Viên",
      key: "/nhanvien",
      icon: <UsergroupAddOutlined />,
    }] : []),

     ]}>

     </Menu>
     
    </div>
  )
}

export default SideMenu
