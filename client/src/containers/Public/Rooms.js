import React, { useState } from 'react'
import icons from '../../ultils/icons'

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

require('../containers.css')

const { CiSearch } = icons;

const Rooms = () => {
    const validateDate = (data) => {
        let d = new Date(data);
        let date = new Date(d); // chuyển chuỗi thành đối tượng Date
        let year = date.getFullYear(); // lấy năm
        let month = date.getMonth() + 1; // lấy tháng (từ 0 đến 11)
        let day = date.getDate(); // lấy ngày
        let formattedDate = day+'/'+ month +'/'+year; // định dạng ngày theo YYYY-MM-DD
        console.log(formattedDate);
    }
    const [inputDate, setinputDate] = useState()
    return (
        <div className='w-1100 ml-10 '>
            <div className='h-[70px] w-full rounded-md bg-slate-500 searchRooms flex justify-center items-center'>
                <div className='flex items-center' ><CiSearch className='ml-2' size={24} /> <input /></div>

                <RangePicker className='w-[400px]   '

                    defaultValue={[dayjs('01/01/2023',
                        dateFormat), dayjs('01/01/2023',
                            dateFormat)]}
                    format={dateFormat}
                    onChange={(e) => {
                        validateDate(e[0].$d)
                        validateDate(e[1].$d)
                    }}
                />

                <button className='searchRoomsButton' >Tìm</button>
            </div>
            <div className='column-2 flex'>
                <div className='w-[200px] h-[500px]'>
                    filters</div>
                <div className='w-full'>
                    <div>filters</div>
                    <div>rooms</div>
                </div>

                <div>

                </div>

            </div>

        </div>
    )
}

export default Rooms