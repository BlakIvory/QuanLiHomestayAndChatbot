import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import  { getOrders, getRevenue } from '../../API'

import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    )

const DashBoard = () => {

    const [orders, setOrders] = useState(0)
    const [Inventor, setInventor] = useState(0)
    const [customer, setcustomer] = useState(0)
    const [revenue, setRevenue] = useState(0)

    return (
        <Space size={20} direction='vertical'>
        <Typography.Title level={4}> DashBoard</Typography.Title>
            <Space direction='horizontal'>
                <DashBoardCard
                    icon={<ShoppingCartOutlined
                        style={{
                            color: 'green',
                            backgroundColor: 'rgba(0,255,0,0.25)',
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,
                        }}
                    />}
                    title={"Orders"}
                    value={orders} >
                </DashBoardCard>
                <DashBoardCard
                    icon={<ShoppingOutlined
                        style={{
                            color: 'purplr',
                            backgroundColor: 'rgba(0,255,255,0.25)',
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,
                        }} />}
                    title={"Inventor"}
                    value={Inventor} >
                </DashBoardCard>
                <DashBoardCard
                    icon={<UserOutlined style={{
                        color: 'red',
                        backgroundColor: 'rgba(255,0,0,0.25)',
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }} />}
                    title={"Customers"}
                    value={customer} >

                    </DashBoardCard>
                <DashBoardCard
                    icon={<DollarCircleOutlined
                        style={{
                            color: 'blue',
                            backgroundColor: 'rgba(0,0,255,0.25)',
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,
                        }} />}
                    title={"Revenue"}
                    value={revenue} >

                </DashBoardCard>

            </Space>
            <Space>
                <RecentOrder></RecentOrder>
                <DashBoardChart></DashBoardChart>
            </Space>

        </Space>
    )
}


const DashBoardCard = ({ title, value, icon }) => {
    return (
        <div>
            <Space direction='horizontal'>
                <Card>
                    <Space>
                        {icon}
                        <Statistic title={title} value={value}></Statistic>
                    </Space>
                </Card>
            </Space>
        </div>
    )
}

const RecentOrder = () => {

    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getOrders().then((res) => {
            setDataSource(res.products.splice(0,10))
            setLoading(false)
        })
    }, [])

    // console.log(dataSource)
    return (
        <div>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
            columns={[
                {
                    title: 'Title',
                    dataIndex: 'title',
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                },
                {
                    title: 'Price',
                    dataIndex: 'discountedPrice',
                },
            ]}
           
            loading={loading}
            dataSource={dataSource}
            pagination={false}
        >
        </Table>
        </div>
    )
}



const DashBoardChart = ()=>{

    const [revenueData, setRevenueData] = useState({
        label: [],
        datasets:[]
    })

    useEffect(()=>{
        getRevenue().then(res => {
            const labels  = res.carts.map(cart=>{
                return `User-${cart.userId}`
            });
            const data  = res.carts.map(cart=>{
                return cart.discountedTotal
            });
            const dataSource = {
                labels,
                datasets: [
                  {
                    label: 'Revenue',
                    data: data,
                    backgroundColor: 'rgba(255, 0, 0, 1)',
                  },
                ],
              };
              setRevenueData(dataSource)
        });
    },[])


    const options = {
        reponse : true,
        plugins:{
            legend:{
               position: 'bottom', 
            },
            title: {
                display:true, 
                text : 'Order Revenue'
            },
        }
    };

    return ( 
        <Card style={{
            width:500,
            height:350
        }}>
            <Bar
        options={options}
        data={revenueData}
    ></Bar>
        </Card>
    )
}
export default DashBoard