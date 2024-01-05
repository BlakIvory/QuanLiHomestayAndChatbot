import React from 'react'
import { Badge, Image, Space, Typography } from 'antd'
import { MailOutlined, BellFilled } from '@ant-design/icons';

const AppHeader = () => {
    return (
        <div className='AppHeader'>
            <Image
                src='https://i.pinimg.com/736x/c1/bd/1b/c1bd1b17381d4cb949dc9f41e9617bc8.jpg'
                width={40}
                className='rounded-full'
            >
            </Image>
            <Typography.Title>HomeStay ADMIN DASHBOARD</Typography.Title>
            <Space>
                <Badge count={10}>
                    <MailOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={20}>
                    <BellFilled style={{ fontSize: 24 }} />
                </Badge>
            </Space>
        </div>
    )
}

export default AppHeader
