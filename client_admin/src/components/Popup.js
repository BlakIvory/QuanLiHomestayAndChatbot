import React, { useEffect, useState, useRef, } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Button,Input } from 'antd';
const Popup = props => {
    const [newdata, setNewdata] = useState({
        nameRoom :'',
        giaRoom :'',
        loaiRoom :'',
        img : '',
        danhgia :'',
    })
    // console.log(props.dataPopup)
    return (
        <div
            // onClick={props.setShowPopup.bind('',false)}
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.5)',
                bottom: '0',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: 'white',
                    width: '700px',
                    borderRadius: '8px',
                    padding: '20px 10px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '700px',
                    }}>
                    <div className='flex justify-center font-semibold'>
                        <h1 >Chi tiết Phòng</h1>
                    </div>

                </div>
                <div className=' flex row'>
                    <div className='col-6 w-[300px]' >
                        <div className='m-2 p-2 '>
                            <div>Tên Phòng :</div>
                            <div className='m-2 ' ><Input onChange={(e)=>{setNewdata( e.target.value) } } placeholder={props.dataPopup.nameRoom}/></div>
                        </div>
                        <div className='m-2 p-2 '>
                            <div>Giá phòng :</div>
                            <div className='m-2  '><Input onChange={(e)=>{setNewdata()}} value={props.dataPopup.giaRoom}/></div>
                        </div>
                        <div className='m-2 p-2 '>
                            <div>Loại Phòng : </div>
                            <div className='m-2 '><Input onChange={(e)=>{setNewdata()}} value={props.dataPopup.loaiRoom}/></div>
                        </div>
                    </div>
                    <div className='col-6 w-[300px]'>
                        <div className='m-2 p-2 '>
                            <div>Hình ảnh 1: </div>
                            <div>input</div>
                        </div>
                        <div className='m-2 p-2 '>
                            <div>Hình ảnh 2:</div>
                            <div>input</div>
                        </div>
                        <div className='m-2 p-2 '>
                            <div>Hình ảnh 3:</div>
                            <div>input</div>
                        </div>
                        <div className='m-2 p-2 '>
                            <div>Đánh giá :</div>
                            <div>input</div>
                        </div>
                    </div>
                </div>
                <div
                    className='flex justify-center items-center'
                >
                    <Button className='border border-blue m-3  bg-green-400'>Save</Button>
                    <Button onClick={props.setShowPopup.bind('', false)} className='border border-blue m-3 bg-gray-400'>Close</Button>
                </div>
            </div>


        </div>
    )
}

export default Popup