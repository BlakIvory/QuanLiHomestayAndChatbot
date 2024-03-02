import React,{ useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography ,Button} from 'antd'
import { apiGetAllSector, getInventory, getOrders } from '../../api'
import { EditOutlined, DeleteOutlined ,UnorderedListOutlined,PlusOutlined} from '@ant-design/icons'
import  AddSectorForm from '../../components/AddSectorForm'
const Sector = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
 
  useEffect(() => {
    setLoading(true);
    getOrders().then(res => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='p-5'>
      
       <Space size={20} direction='vertical'>
       <div className='flex justify-between'>
          <Typography.Title level={4}>QUẢN LÝ KHU VỰC</Typography.Title>
          <Button className='bg-primary border text-green'
            size={40}
            icon={<PlusOutlined />}
          
          >Thêm Khu Vực</Button>

        </div>
        <Table
        loading={loading}
        columns={[
          {
            title: 'Tên khu vực',
            dataIndex: 'id',
          },
          {
            title: 'Đặt điểm khu vực ',
            dataIndex: 'title',
          },
          {
            title: 'Vị trí',
            dataIndex: 'áđá',
            render: (value)=> <span>${value}</span>
          },
          {
            title: 'Số lượng phòng',
            dataIndex: 'sada',
          },
          {
            title: 'tình trạng',
            dataIndex: 'sda',
          },
          {
            title: 'Chỉnh sửa',
            render: (text) => <div className='flex justify-between'>
              <UnorderedListOutlined  className='m-1 flex items-center justify-center'  style={{ fontSize: '20px', color: 'green' ,  }} onClick={() => { console.log("text") }} />
              <EditOutlined className='m-1 flex items-center justify-center'  style={{ fontSize: '20px', color: 'green' ,  }} onClick={() => { console.log("text") }} /> 
              <DeleteOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'red' }} onClick={() => { console.log("text") }} /></div>
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize:6
        }}
        ></Table>
       </Space>
    </div>
  )
}

export default Sector