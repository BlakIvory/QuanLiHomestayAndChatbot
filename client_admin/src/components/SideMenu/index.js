import { Menu } from 'antd'
import { AppstoreOutlined, ShopFilled, ShoppingCartOutlined,HomeOutlined, UserOutlined,MenuFoldOutlined } from '@ant-design/icons';

import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <div className='SideMenu   '>
     <Menu 
     className='bg-primary'
     onClick={(item)=>{
      //item.key
      // console.log("object")
      navigate(item.key)
     }}
     items={[
      {label : "Quản Lý DashBoard",
      icon : <AppstoreOutlined/>,
      key : "/",
    },
    {label : "Inventory",
      key : "/inventory",
      icon : <ShopFilled/>,
    },
    {label : "Quản Lý Đặt Phòng",
      key : "/orders",
      icon : <ShoppingCartOutlined></ShoppingCartOutlined>
    },
    {label : "Quản Lý Tài Khoản",
      key : "/customers",
      icon : <UserOutlined></UserOutlined>
    },
    {label : "Quản Lý Khu Vực",
      key : "/sectors",
      icon : <MenuFoldOutlined></MenuFoldOutlined>
    },
    {label : "Quản Lý Phòng",
      key : "/rooms",
      icon : <HomeOutlined />
    }
     ]}>

     </Menu>
     
    </div>
  )
}

export default SideMenu
