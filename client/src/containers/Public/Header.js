import React,{useCallback} from 'react'
import logo from '../../assets/OIP.png'
import { Button } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Navigation } from './index'
const { CgLogIn, CgLogOut, CgNotes } = icons

const Header = () => {

    const navigate = useNavigate()
    const goLogin = useCallback(() =>{
        navigate(path.LOGIN)
    },[])

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-1100 flex items-center justify-between'>
            <img className='w-[300px] h-[70px] object-cover'
                src={logo}
                alt='logo'
            />
            <div className='flex items-center gap-1'>
                <div> Xin Chào Quý Khách !</div>
                <Button
                    text={'Đăng Nhập'}
                    textColor='text-white'
                    bgColor='bg-[#3961fb]' 
                    IcAfter={CgLogIn} 
                    onClick={goLogin}/>
                <Button text={'Đăng Kí'} textColor='text-white' bgColor='bg-[#3961fb]' IcAfter={CgNotes} onClick={goLogin}/>
                <Button text={'Đăng Xuất'} textColor='text-white' bgColor='bg-secondary2' IcAfter={CgLogOut} />
            </div>
        </div>
            
        </div>
    )
}

export default Header
