import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from 'antd';
const Popup = props => {

    console.log(props.dataPopup)
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
                zIndex: 1,
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
                <div>sadsadasd</div>
                <div
                   className='flex justify-center items-center'
                >
                    <Button  className='border border-blue m-3  bg-green-400'>Save</Button>
                    <Button  onClick={props.setShowPopup.bind('', false)}  className='border border-blue m-3 bg-gray-400'>Close</Button>
                </div>
            </div>


        </div>
    )
}

export default Popup