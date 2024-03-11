import React,{ useEffect, useState } from 'react'
import { Avatar, Rate, Space, Table, Typography ,Button} from 'antd'
import { apiGetAllSector, getInventory, getOrders } from '../../api'
import { EditOutlined, DeleteOutlined ,UnorderedListOutlined,PlusOutlined} from '@ant-design/icons'
import  AddSectorForm from '../../components/AddSectorForm'
const Sector = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [showAddSectorPopup,  setShowAddSectorPopup] = useState(false)
  useEffect(() => {
    setLoading(true);
    apiGetAllSector().then(res => {
      // console.log(res)
      setDataSource(res.data.sectors);
      setLoading(false);
    });
  }, []);

  return (
    
    <div className='p-5'>
      {showAddSectorPopup && (
      <AddSectorForm  setShowAddSectorPopup={setShowAddSectorPopup}></AddSectorForm>
    )}
       <Space size={20} direction='vertical'>
       <div className='flex justify-between'>
          <Typography.Title level={4}>QUẢN LÝ KHU VỰC</Typography.Title>
          <Button className='bg-primary border text-green'
            size={40}
            icon={<PlusOutlined />}
            onClick={()=>setShowAddSectorPopup(true)}
          >
            Thêm Khu Vực
          </Button>

        </div>
        <Table
        loading={loading}
        rowKey="_id"
        columns={[
          {
            title: 'Tên khu vực',
            dataIndex: 'nameSector',
          },
          {
            title: 'Đặt điểm khu vực ',
            dataIndex: 'discSector',
          },
          {
            title: 'Vị trí',
            dataIndex: 'addressSector',
            
          },
          {
            title: 'Số lượng phòng',
            dataIndex: 'totalRoomInSector',
            align: 'center',
          },
          {
            title: 'tình trạng',
            dataIndex: 'statusSector',
            align: 'center',
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