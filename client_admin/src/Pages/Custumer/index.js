import React,{ useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography } from 'antd'
import { getCustomer, getInventory, getOrders } from '../../api'

const Customer = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])


  useEffect(()=>{
    setLoading(true)
    getCustomer().then(res=>{
      setDataSource(res.users)
      setLoading(false)
    })


  },[])
  

  return (

    <div className='p-5'>
       <Space size={20} direction='vertical'>
       <Typography.Title level={4}>Khach hang</Typography.Title>
        <Table
        loading={loading}
        columns={[
          {
            title: 'Photo',
            dataIndex: 'image',
            render: (link) => {
              return <Avatar src={link}/>
            },
          },
          {
            title: 'First Name',
            dataIndex: 'firstName',
          },
          {
            title: 'Last Name',
            dataIndex: 'lastName',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
          },       
          {
            title: 'Address',
            dataIndex: 'address',
            render : (a)=>{
              return <span>{a.address},{a.city}</span>
            }
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

export default Customer