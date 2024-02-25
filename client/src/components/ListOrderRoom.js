import React,{useState,useEffect} from 'react'
import OrderRoomItem from './OrderRoomItem'

const ListOrderRoom = (props) => {
  // console.log(props.dataOrder)
  const [dataOrder, setDataOrder] = useState(props.dataOrder)
  useEffect(() => {
    setDataOrder(props.dataOrder)
  }, [props.dataOrder])
  
  return (
    <div>
      {dataOrder.map((order,index)=>
      (
      <div className='' key={order.idRoom + '-' + index }>
        <OrderRoomItem order={order}  />
        </div>
      )
      )}
    </div>
  )
}

export default ListOrderRoom