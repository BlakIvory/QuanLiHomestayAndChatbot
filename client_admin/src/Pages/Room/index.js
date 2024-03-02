  import React, { useEffect, useState, useRef, } from 'react'
  import { Rate, Space, Table, Typography, Image, Button, Input, } from 'antd'
  import { EditOutlined, DeleteOutlined, UnorderedListOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
  import { apiDeleteRoom, apiGetAllRoom } from '../../api'
  import Highlighter from 'react-highlight-words';
  import AddRoomForm from '../../components/AddRoomForm';
  import swal from 'sweetalert';

  const Room = () => {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    //tim kiem + sap xep
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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
        ...getColumnSearchProps('nameRoom'),
        sorter: (a, b) => a.nameRoom.length - b.nameRoom.length,
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          if (record._id === editingRow) {
            return <Input value={text} onChange={(e) => console.log(e.target.value)} />;
          }
          return text;
        },
      
      },
      {
        title: 'Giá Phòng',
        dataIndex: 'giaRoom',

        render: (value) => <span>{value} vnđ</span>,
        sorter: (a, b) => a.giaRoom - b.giaRoom,
        sortDirections: ['ascend', 'descend']
      },
      {
        title: 'Loại Phòng',
        dataIndex: 'loaiRoom',
        ...getColumnSearchProps('loaiRoom'),

      },
      {
        title: 'Hình Ảnh 1',
        render: (value) =>
          <Image width={100} src={value.imgRoom[0].secure_url
          } />
      },
      {
        title: 'Hình Ảnh 2',
        render: (value) =>
          <Image width={100} src={value.imgRoom[1].secure_url
          } />
      },
      {
        title: 'Hình Ảnh 3',
        render: (value) => <Image width={100} src={value.imgRoom[2].secure_url
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
        render: ( _, record) =>{
          
          if (record._id === editingRow) {
            return (
              <Button type="primary" onClick={() => handleSaveClick(record)}>
                Lưu
              </Button>
            );
          }
          return (
            <Button onClick={() => {
              console.log(record._id)
              handleEditClick(record)}}>
              Chỉnh sửa
            </Button>
          );
        }
          
          
            // {/* <UnorderedListOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'green', }} onClick={() => {setDataPopup(index); setShowPopup(true) }} /> */}
            // {/* <EditOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'green', }} onClick={() => handleEditClick(record)} /> */}
            
           
        
            
            
            // {/* <DeleteOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'red' }} 
            // onClick={async() => {
            //   const result = await apiDeleteRoom(record)
            //   if(result.status===0){
            //     swal('Thành Công !',result.msg, 'success')
            //   }
            //   }
            //   } /> */}
          

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

    const [editingRow, setEditingRow] = useState(null);

    const handleEditClick = (record) => {
      setEditingRow(record._id);
    };
    const handleSaveClick = (record) => {
      // Lưu các giá trị đã chỉnh sửa vào backend hoặc cập nhật state
      // Để đơn giản, ở đây chúng ta chỉ cập nhật state
      //lưu vào database
      setDataSource((prevData) => {
        const updatedData = prevData.map((item) => {
          if (item._id === record._id) {
            return {
              ...item,
              Info1: record._id,
              Info2: record._id,
              Info3: record._id,
            };
          }
          return item;
        });
        return updatedData;
      });
      setEditingRow(null);
    };
    return (
      <div className='p-5'>
      
        {showAddRoomPopup && <AddRoomForm setShowAddRoomPopup={setShowAddRoomPopup}></AddRoomForm>}
        
        <Space 
        size={20} direction='vertical'>
          
          <div className='flex justify-between'>
            <Typography.Title level={4}>QUẢN LÝ PHÒNG HOMESTAY</Typography.Title>
            <Button className='bg-primary border text-green'
              size={40}
              icon={<PlusOutlined />}
              onClick={() =>{setShowAddRoomPopup(true)}}
            >Thêm phòng</Button>

          </div>
          <Table 
            loading={loading}
            bordered
            rowKey="_id"
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