import React from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'




const Login = () => {
  





  return (
    <div className=' flex items-center justify-center'>
      <div className='mt-3 bg-white w-[600px] p-[30px] rounded-md shadow-md pb-[100px]'>
        <h1 className='font-semibold text-2xl'>Đăng Nhập</h1>
        <div className='w-full flex flex-col gap-3 mb-4 mt-3'>
          <InputForm label={'Tên Tài Khoản : '} />
          <InputForm label={'Số điện thoại : '} />
          <InputForm label={'Mật Khẩu : '} />
        </div>
        <div className='flex justify-center items-center '>
          <Button
            text='Đăng Nhập'
            bgColor='bg-secondary1'
            textColor='text-white'
            fullwidth
          />
        </div >
        <div className=' m-2 '>
          <small className='text-[blue] hover:underline hover:text-[orange] cursor-pointer'>
             <Link to="/register">Tạo tài khoản mới !</Link>
          </small>
        </div>
      </div>
    </div>
  )
}

export default Login
