import React from 'react'
import { useNavigate , NavLink } from 'react-router-dom'
import { path  } from '../../ultils/constant'
// import { Image } from 'antd';
require('../containers.css')
const Navigation = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full flex justify-center items-center h-[50px] bg-[#A64AC9] mt-2'>
      <div className='w-[800px] flex justify-between'>
            
        <div className='navbars'>
          <img className='rounded-full cursor-pointer'
            onClick={() => {
              navigate(path.TRANGCHU)
            }}
            width='80px' src='https://okcredit-blog-images-prod.storage.googleapis.com/2021/02/homestay3.jpg'
            alt='logo'
          />
          </div>
        <div className='flex justify-center items-center  '>
        <ul className='flex items-center justify-center gap-3 navbars font-semibold'>
        
        <NavLink
        to ='/trangchu'
        style={({ isActive }) => ({
          color: isActive ? "#FCCD04": "white" 
        })}
        >
          Trang Chủ
        </NavLink>
        <NavLink
        to ='/gioithieu'
        style={({ isActive }) => ({
          color: isActive ? "#FCCD04": "white" 
        })}
        >
         Giới Thiệu
        </NavLink>
        <NavLink
        to ='/thu'
        style={({ isActive }) => ({
          color: isActive ? "#FCCD04": "white" 
        })}
        >
          Xem Phòng
        </NavLink>
        <NavLink
        to ='/thádu'
        style={({ isActive }) => ({
          color: isActive ? "#FCCD04": "white" 
        })}
        >
          Đặt Phòng
        </NavLink>
       
        <NavLink
        to ='/trgchu'
        style={({ isActive }) => ({
          color: isActive ? "#FCCD04": "white" 
        })}
        >
          Cá Nhân
        </NavLink>
        
        </ul>

        </div>
      </div>
    </div>
  )
}

export default Navigation
