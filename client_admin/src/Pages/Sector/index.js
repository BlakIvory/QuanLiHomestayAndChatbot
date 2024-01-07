import React,{ useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import { getInventory } from '../../api'
import { EditOutlined, DeleteOutlined ,UnorderedListOutlined} from '@ant-design/icons'
const Sector = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])


  useEffect(()=>{
    setLoading(true)
    getInventory().then(res=>{
      setDataSource(res.products)
      setLoading(false)
    })


  },[])


  return (
    <div className='p-5'>
       <Space size={20} direction='vertical'>
       <Typography.Title level={4}>Kho Hàng</Typography.Title>
        <Table
        loading={loading}
        columns={[
          {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: (link) => {
              return <Avatar src={link}/>
            },
          },
          {
            title: 'Title',
            dataIndex: 'title',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            render: (value)=> <span>${value}</span>
          },
          {
            title: 'Rating',
            dataIndex: 'rating',
            render: (rating)=>{
              return <Rate value={rating} allowHalf disabled></Rate>
            }
          },
          {
            title: 'Stock',
            dataIndex: 'stock',
          },
         
          {
            title: 'Brand',
            dataIndex: 'brand',
          },
          {
            title: 'Category',
            dataIndex: 'category',
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
          pageSize:6
        }}
        ></Table>
       </Space>
    </div>
  )
}

export default Sector