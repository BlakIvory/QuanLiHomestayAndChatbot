import React, { useEffect, useState, useRef, } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { PlusOutlined } from '@ant-design/icons';
import  axios  from 'axios';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
} from 'antd';

const AddRoomForm = props => {
    const [selectedFile, setSelectedFile] = useState('');
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [formData, setFormData] = useState({
        nameRoom: "",
        giaRoom: "",
        loaiRoom: "",
        khuvucid: "",
        imgRoom: selectedFile,

      
     });

    
    const uploadImage = async (e)=>{
       const formData = new FormData()
        formData.append('file',e)
        formData.append('upload_preset',"btj12veg");
       await axios.post("https://api.cloudinary.com/v1_1/doqqlyjb2/image/upload",formData
        ).then(
            (response)=>{
                console.log(response);
                setSelectedFile(response.data.url);
            }
            ).catch((err) => {
                console.log(err)
            });;
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

      const submitform = (e) => {
        // console.log(formData);
        console.log(selectedFile)
        
         
        }
    return (

        <div
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
                    width: '800px',
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
                        <h1 >Thêm Phòng Mới</h1>
                    </div>

                </div>
                <div className=' w-[750px] mt-4'>
                    <Form
                        onFinish={submitform}
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        style={{
                            maxWidth: 750,
                        }}
                        
                    >
                        <Form.Item name="nameRoom" label="Tên phòng : " className=''>
                            <Input className='w-[200px]' />
                        </Form.Item>
                        <Form.Item name="loaiRoom" label="Loại Phòng : ">
                            <div className='flex row w-[200px]'>
                                <Select >
                                    <Select.Option value="1-2 người">1-2 người </Select.Option>
                                    <Select.Option value="3-4 người">3-4 người </Select.Option>
                                    <Select.Option value="5-7 người">5-7 người </Select.Option>
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item name='khuVucId'  label="Khu vực phòng : ">
                            <div className='flex row w-[200px]'>

                                <Select name='khuvucId' >
                                    <Select.Option value="View biển">View biển </Select.Option>
                                    <Select.Option value="View núi">View núi </Select.Option>
                                    <Select.Option value="Vip 1">Vip 1 </Select.Option>
                                    <Select.Option value="Vip 2">Vip 2 </Select.Option>
                                </Select>
                            </div>
                        </Form.Item>


                        <Form.Item name='giaRoom' label="Giá phòng : ">
                            <InputNumber className='w-[200px]' step={10000} />
                        </Form.Item>

                        <Form.Item label="Hình ảnh:" name='img' valuePropName="file" getValueFromEvent={normFile} className=''>
                            <Upload name='img'  customRequest={dummyRequest} action={uploadImage}  maxCount='3' listType="picture-card">
                                <PlusOutlined />
                                <div>
                                    Uploads
                                </div>
                            </Upload>
                        </Form.Item>
                        <div
                            className='flex justify-center items-center' >
                            <Button htmlType='submit' className='border border-blue m-3  bg-green-400' >Save</Button>
                            <Button onClick={props.setShowAddRoomPopup.bind('', false)} className='border border-blue m-3 bg-gray-400'>Close</Button>
                        </div>
                    </Form>

                </div>

            </div>


        </div>
    )
}

export default AddRoomForm