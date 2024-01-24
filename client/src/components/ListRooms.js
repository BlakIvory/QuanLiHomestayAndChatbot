import React, { useState, useEffect } from 'react'
import * as api from '../services'
import RoomItem from './RoomItem'
const ListRooms = (props) => {
    const [rooms, setRooms] = useState(props.dataRooms)
    return (
        <div className='ml-2 mt-2'>
            {rooms?.map((room) => (
                <RoomItem room={room} key={room._id}/>
            ))}
        </div>
    )
}

export default ListRooms