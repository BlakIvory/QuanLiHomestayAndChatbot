import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputForm, Button } from '../../components'
import * as actions from '../../store/actions'
import { useDispatch} from 'react-redux'




const Register = () => {


  const dispatch = useDispatch()
  

  const [payload, setPayload] = useState({
    phone : '',
    password : '',
    address : '',
    name : '',
    email:  '',
  })
  const handleSubmit= async () => {
      dispatch(actions.register(payload))
  }
  return (
    <div className=' flex items-center justify-center'>
      <div className='mt-3 bg-white w-[600px] p-[30px] rounded-md shadow-md pb-[100px]'>
        <h1 className='font-semibold text-2xl'>Đăng Ký</h1>
        <div className='w-full flex flex-col gap-3 mb-4 mt-3'>
          <InputForm label={'Tên Tài Khoản : '}  value={payload.name} setValue={setPayload} type={'name'} typeinput = {'text'} />
          <InputForm label={'Số điện thoại : '}  value={payload.phone} setValue={setPayload} type={'phone'} typeinput = {'text'}/>
          <InputForm label={'Email : '} value={payload.email}  setValue={setPayload} type={'email'} typeinput = {'email'}/>
          <InputForm label={'Địa chỉ : '}  value={payload.address} setValue={setPayload} type={'address'} typeinput = {'text'}/>
          <InputForm label={'Mật Khẩu : '}  value={payload.password} setValue={setPayload} type={'password'} typeinput = {'password'}/>
        </div>
        <div className='flex justify-center items-center '>
          <Button
            text='Đăng Ký'
            bgColor='bg-secondary1'
            textColor='text-white'
            fullwidth
            onClick={handleSubmit}
          />
        </div >
        <div className=' m-2 '>Tôi đã có tài khoản ?
          <small className='text-[blue] hover:underline hover:text-[orange] cursor-pointer'>
            <Link to="/login"> Đăng Nhập ngay !</Link>
          </small>
        </div>
      </div>
    </div>
  )
}

export default Register
