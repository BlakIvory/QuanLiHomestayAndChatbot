import React, { useEffect, useState, useRef, } from 'react'
import { Rate, Space, Table, Typography, Image, Button, Input, } from 'antd'
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { apiDeleteRoom, apiGetAllRoom } from '../../api'
import Highlighter from 'react-highlight-words';
import Popup from '../../components/Popup';
import AddRoomForm from '../../components/AddRoomForm';

const Room = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  //tim kiem + sap xep
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [dataPopup, setDataPopup] = useState('')
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);
  

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button

            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button

            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  
  const columns = [
    {
      title: 'Tên Phòng',
      dataIndex: 'nameRoom',
      key: 'nameRoom',
      ...getColumnSearchProps('nameRoom'),
      sorter: (a, b) => a.nameRoom.length - b.nameRoom.length,
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Giá Phòng',
      dataIndex: 'giaRoom',
      key: 'giaRoom',
      render: (value) => <span>{value} vnđ</span>,
      sorter: (a, b) => a.giaRoom.length - b.giaRoom.length,
    },
    {
      title: 'Loại Phòng',
      dataIndex: 'loaiRoom',
      key: 'loaiRoom',
      ...getColumnSearchProps('loaiRoom'),

    },
    {
      title: 'Hình Ảnh 1',
      render: (value) =>
        <Image width={100} src={value.imgRoom[0].url
        } />
    },
    {
      title: 'Hình Ảnh 2',

      render: (value) =>
        <Image width={100} src={value.imgRoom[1].url 
        } />
    },
    {
      title: 'Hình Ảnh 3',
      render: (value) => <Image width={100} src={value.imgRoom[2].url
      } />
    },
    {
      title: 'Đánh giá',
      key: 'danhgiaRoom',
      dataIndex: 'danhgiaRoom',
      render: (rating) => {
        return <Rate value={rating} allowHalf disabled></Rate>
      },

    },
    {
      title: 'Chỉnh sửa',
      render: (index) =>
        <div className='flex justify-between'>
         
          <UnorderedListOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'green', }} onClick={() => {setDataPopup(index); setShowPopup(true) }} />
          <EditOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'green', }} onClick={() => { console.log(index) }} />
          <DeleteOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'red' }} 
          onClick={async() => {
             const result = await apiDeleteRoom(index)
            }
             } />
        </div>

    },
  ]

  useEffect(() => {
    setLoading(true)
    apiGetAllRoom().then(res => {
      setDataSource(res.data.rooms)
      // console.log(res.data.rooms)
      setLoading(false)
    })

  }, [])



  return (
    <div className='p-5'>
     
      {showAddRoomPopup && <AddRoomForm setShowAddRoomPopup={setShowAddRoomPopup}></AddRoomForm>}
       {showPopup && <Popup dataPopup={dataPopup} setShowPopup={setShowPopup}/>}
      <Space 
       size={20} direction='vertical'>
        
        <div className='flex justify-between'>
          <Typography.Title level={4}>Phòng HomeStay</Typography.Title>
          <Button className='bg-primary border text-green'
            size={40}
            icon={<PlusOutlined />}
            onClick={() =>{setShowAddRoomPopup(true)}}
          >Thêm phòng</Button>

        </div>
        <Table 
          loading={loading}
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
        ></Table>
      </Space>

    </div>
  )
}

export default Room