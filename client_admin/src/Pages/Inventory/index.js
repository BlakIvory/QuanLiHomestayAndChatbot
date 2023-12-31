import React,{ useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import { getInventory } from '../../api'

const Inventory = () => {
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
            key: 'title',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value)=> <span>${value}</span>
          },
          {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating)=>{
              return <Rate value={rating} allowHalf disabled></Rate>
            }
          },
          {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
          },
         
          {
            title: 'Brand',
            dataIndex: 'brand',
            key:'brand'
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key:'category'
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

export default Inventory