import React, { useEffect, useState, useRef } from 'react'
import { Avatar, Rate, Space, Table, Typography, Button, Input, } from 'antd'
import { getCustomer, getInventory, getOrders, apiGetAllUser } from '../../api'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const Customer = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
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
            type="primary"
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
            type="link"
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

  useEffect(() => {
    setLoading(true)
    apiGetAllUser()
      .then(res => {
        // console.log(res)
        setDataSource(res.data.users)
        setLoading(false)
      })


  }, [])


  return (

    <div className='p-5'>
      <Space size={20} direction='vertical'>
        <Typography.Title level={4}>QUẢN LÝ TÀI KHOẢN KHÁCH HÀNG</Typography.Title>
        <Table
          loading={loading}
          rowKey="_id"
          columns={[
            {
              title: 'Họ và tên',
              dataIndex: 'name',
              key: 'name',
              ...getColumnSearchProps('name'),
            },
            {
              title: 'Tên tài khoản',
              dataIndex: 'phone',
              key: 'phone',
              ...getColumnSearchProps('phone'),
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key:'email',
              sorter: (a, b) => a.email.localeCompare(b.email),
              sortDirections: ['ascend', 'descend'],
            },
            {
              title: 'Số điện thoại',
              dataIndex: 'phone',
              key:'phone',
             
            },
            {
              title: 'Địa chỉ',
              dataIndex: 'address',
              key:'address',
              ...getColumnSearchProps('address'),
              sorter: (a, b) => a.address.length - b.address.length,
              sortDirections: ['descend', 'ascend'],
              // render : (a)=>{
              //   return <span>{a.address},{a.city}</span>
              // }
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

export default Customer