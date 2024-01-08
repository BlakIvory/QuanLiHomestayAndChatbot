import React, { useEffect, useState, useRef, } from 'react'
import { Avatar, Rate, Space, Table, Typography, Image, Button, Input, Form, InputNumber, Popconfirm, } from 'antd'
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, SearchOutlined } from '@ant-design/icons'
import { getInventory, apiGetAllRoom } from '../../api'
import Highlighter from 'react-highlight-words';


const Room = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  //tim kiem + sap xep
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  // edit room
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;


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

  const edit = (record) => {
    form.setFieldsValue({
      nameRoom: '',
      giaRoom: '',
      loaiRoom: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      console.log(newData);
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

///định ngihĩa tên cột


  const columns = [
    {
      title: 'Tên Phòng',
      dataIndex: 'nameRoom',
      key: 'nameRoom',
      ...getColumnSearchProps('nameRoom'),
      sorter: (a, b) => a.nameRoom.length - b.nameRoom.length,
      sortDirections: ['descend', 'ascend'],
      editable: true,
    },
    {
      title: 'Giá Phòng',
      dataIndex: 'giaRoom',
      key: 'giaRoom',
      sorter: (a, b) => a.giaRoom > b.giaRoom,
      render: (value) => <span>{value} vnđ</span>,
      editable: true,
    },
    {
      title: 'Loại Phòng',
      dataIndex: 'loaiRoom',
      key: 'loaiRoom',
      ...getColumnSearchProps('loaiRoom'),
      editable: true,
    },
    {
      title: 'Hình Ảnh 1',

      render: (value) =>
        <Image width={100} src={value.imgRoom[0].path} />
      // {console.log(value.imgRoom[0].path)}
      // <Image width={100} src={"../../uploads/"+value.imgRoom[0].filename}/>
    },
    {
      title: 'Hình Ảnh 2',

      render: (value) =>
        <Image width={100} src={value.imgRoom[1].path} />
    },
    {
      title: 'Hình Ảnh 3',
      render: (value) => <Image width={100} src={value.imgRoom[2].path} />
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
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },


      // <div className='flex justify-between'>
      //   <UnorderedListOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'green', }} onClick={() => { console.log(text) }} />
      //   <EditOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'green', }} onClick={() => { console.log(text) }} />
      //   <DeleteOutlined className='m-1 flex items-center justify-center' style={{ fontSize: '20px', color: 'red' }} onClick={() => { console.log(text) }} /></div>
    },

  ]


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
   
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    // console.log(dataIndex);
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


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
      <Space size={20} direction='vertical'>
        <Typography.Title level={4}>Phòng HomeStay</Typography.Title>
        <Form form={form} component={false}>
        <Table
          loading={loading}
          bordered
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={dataSource}
          pagination={{
            
            onChange: cancel,
          }}
        ></Table>
        </Form>
      </Space>
    </div>
  )
}

export default Room