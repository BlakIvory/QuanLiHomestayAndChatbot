import React,{ useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import { getInventory, getOrders } from '../../API'

const Orders = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])


  useEffect(()=>{
    setLoading(true)
    getOrders().then(res=>{
      setDataSource(res.products)
      setLoading(false)
    })


  },[])


  return (
    <div className='p-5'>
       <Space size={20} direction='vertical'>
       <Typography.Title level={4}>Dat hang</Typography.Title>
        <Table
        loading={loading}
        columns={[
      
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
            title: 'DiscountedPrice',
            dataIndex: 'discountedPrice',
            render:  (value)=> <span>${value}</span>
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
          
          },
          {
            title: 'Total',
            dataIndex: 'total',
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

export default Orders