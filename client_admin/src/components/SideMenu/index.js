import { Menu } from 'antd'
import { AppstoreOutlined, ShopFilled, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <div className='SideMenu w-[250px]  '>
     <Menu 
     className='bg-primary'
     onClick={(item)=>{
      //item.key
      // console.log("object")
      navigate(item.key)
     }}
     items={[
      {label : "DashBoard",
      icon : <AppstoreOutlined/>,
      key : "/",
    },
    {label : "Inventory",
      key : "/inventory",
      icon : <ShopFilled/>,
    },
    {label : "Orders",
      key : "/orders",
      icon : <ShoppingCartOutlined></ShoppingCartOutlined>
    },
    {label : "Customers",
      key : "/customers",
      icon : <UserOutlined></UserOutlined>
    }
     ]}>

     </Menu>
     
    </div>
  )
}

export default SideMenu
