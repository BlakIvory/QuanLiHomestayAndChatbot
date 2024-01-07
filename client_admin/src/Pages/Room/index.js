import React, { useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import { EditOutlined, DeleteOutlined ,UnorderedListOutlined} from '@ant-design/icons'
import { getInventory } from '../../api'

const Room = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])


  useEffect(() => {
    setLoading(true)
    getInventory().then(res => {
      setDataSource(res.products)
      setLoading(false)
    })


  }, [])


  return (
    <div className='p-5'>
      <Space size={20} direction='vertical'>
        <Typography.Title level={4}>Phòng HomeStay</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: 'Thumbnail',
              dataIndex: 'thumbnail',
              render: (link) => {
                return <Avatar src={link} />
              },
            },
            {
              title: 'Tên Phòng',
              dataIndex: 'title',
            },
            {
              title: 'Giá Phòng',
              dataIndex: 'price',
              render: (value) => <span>${value}</span>
            },
            {
              title: 'Loại Phòng',
              dataIndex: 'rating',
              render: (rating) => {
                return <Rate value={rating} allowHalf disabled></Rate>
              }
            },
            {
              title: 'Hình Ảnh 1',
              dataIndex: 'stock',
            },
            {
              title: 'Hình Ảnh 2',
              dataIndex: 'brand',
            },
            {
              title: 'Hình Ảnh 3',
              dataIndex: 'category',
            },
            {
              title: 'Đánh giá',
              dataIndex: 'rating',
              render: (rating) => {
                return <Rate value={rating} allowHalf disabled></Rate>
              }
            },
            {
              title: 'Chỉnh sửa',

              render: (text) => <div className='flex justify-between'>
                <UnorderedListOutlined  className='m-1 flex items-center justify-center'  style={{ fontSize: '20px', color: 'green' ,  }} onClick={() => { console.log(text) }} />
                <EditOutlined className='m-1 flex items-center justify-center'  style={{ fontSize: '20px', color: 'green' ,  }} onClick={() => { console.log(text) }} /> 
                <DeleteOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'red' }} onClick={() => { console.log(text) }} /></div>
            },
            
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 6
          }}
        ></Table>
      </Space>
    </div>
  )
}

export default Room