import React, { useState, useEffect } from 'react'
import icons from '../../ultils/icons'
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Select, Slider } from 'antd';

import { ListRooms, RoomItem } from '../../components';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

require('../containers.css')

const { CiSearch } = icons;

const Rooms = () => {
   
    const [rollSliderStart, setRollSliderStart] = useState(600000)
    const [rollSliderEnd, setRollSliderEnd] = useState(2000000)
    const [searchPlace, setSearchPlace] = useState('')
    const formatter = (value) => `${value.toLocaleString()},000 nvđ`;
    const validateDate = (data) => {
        let d = new Date(data);
        let date = new Date(d); // chuyển chuỗi thành đối tượng Date
        let year = date.getFullYear(); // lấy năm
        let month = date.getMonth() + 1; // lấy tháng (từ 0 đến 11)
        let day = date.getDate(); // lấy ngày
        let formattedDate = day + '/' + month + '/' + year; // định dạng ngày theo YYYY-MM-DD
        // console.log(formattedDate);
        return formattedDate.toString();
    }



   
    // console.log(dataRooms)

    const [inputData, setInputData] = useState(
        {
            place: searchPlace,
            dateStart: validateDate(new Date()),
            dateEnd: validateDate(new Date()),
            giaStart: rollSliderStart,
            giaEnd: rollSliderEnd,
            loaiPhong: '1-2 người',
        }
    )

    function disabledDate(current) {
        // Can not select days after today
        return current && current < moment().endOf('day');
    }

    const handleChangeSelect = (value) => {
        inputData.loaiPhong = value
        // console.log(inputData)
    };
    const handleChangeDate = (data) => {
        if (data !== null) {
            const dateStart = validateDate(data[0].$d)
            // console.log(dateStart)
            const dateEnd = validateDate(data[1].$d)
            // console.log(dateStart)
            inputData.dateStart = dateStart;
            inputData.dateEnd = dateEnd;
        }
        // console.log(inputData)
    };
    const handleOnChangeSlider = (value) => {
        setRollSliderStart(value[0])
        setRollSliderEnd(value[1])
        // console.log(value[0])
        inputData.giaStart = value[0]
        inputData.giaEnd = value[1]

    }
    const handleSubmitSearch = (value) => {
        //goi API để search
        console.log(inputData)
    }





    return (
        <div className='w-1100 ml-10 '>
            <div className='h-[70px] w-full rounded-md bg-slate-500 searchRooms flex justify-center items-center'>
                <div className='flex items-center' >
                    <CiSearch className='ml-2' size={24} />
                    <input placeholder='Nhập nơi cần tìm ...'
                        onChange={(e) => {
                            // console.log(e.target.value);
                            setSearchPlace(e.target.value);
                        }}
                    />
                </div>
                <RangePicker
                    className='w-[300px]   '
                    disabledDate={disabledDate}
                    defaultValue={[
                        dayjs(`${moment().format('DD/MM/YYYY')}`, dateFormat),
                        dayjs(`${moment().format('DD/MM/YYYY')}`, dateFormat)
                    ]}
                    placeholder={['Ngày Đi','Ngày Về']}
                    format={dateFormat}
                    onChange={(e) => {
                        handleChangeDate(e)
                    }}
                />

                <Select
                    className='round-md'
                    defaultValue="1-2 người"
                    style={{ width: 150, }}
                    onChange={handleChangeSelect}
                    options={[
                        {
                            label: 'Loại Phòng',
                            options: [
                                { label: '1-2 người', value: '1-2 người' },
                                { label: '3-4 người', value: '3-4 người' },
                                { label: '5-6 người', value: '5-6 người' },
                            ],
                        },

                    ]}
                />

                <button className='searchRoomsButton' onClick={handleSubmitSearch} >Tìm</button>
            </div>
            <div className='column-2 flex'>
                <div className='w-[200px] h-[500px]  '>
                    <div className='filterUnder pl-2 pr-2'>
                        <div> Giá mỗi đêm</div>
                        <div>
                            <Slider
                                className='w-[160px mt-7'
                                min={100000}
                                max={5000000}
                                step={10000}
                                range defaultValue={[600000, 2000000]}
                                onChange={handleOnChangeSlider}
                                tooltip={{
                                    formatter,
                                }}
                            />
                        </div>
                        <div className='flex w-full gap-2 rollSliderContent'>
                            <div className='w-[50%] justify-start  flex'>
                                Từ :
                            </div>
                            <div className='  justify-center items-center flex'>
                                Đến :
                            </div>
                        </div>
                        <div className='flex w-full gap-2 rollSliderContent'>
                            <div className=' justify-center items-center flex'>
                                {rollSliderStart.toLocaleString()} vnđ
                            </div>
                            <div className='  justify-center items-center flex'>
                                {rollSliderEnd.toLocaleString()} vnđ
                            </div>
                        </div>
                        <div className='mt-1 mb-1'>
                            <button className='w-full flex justify-center bg-blue-500 border rounded-lg'
                                onClick={handleSubmitSearch}
                            >
                                Tìm
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                  
                    <div>
                       <ListRooms />
                    </div>
                </div>

                <div>

                </div>

            </div>

        </div>
    )
}

export default Rooms