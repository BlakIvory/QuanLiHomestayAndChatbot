import React,{useState,useEffect} from 'react'
import OrderRoomItem from './OrderRoomItem'

const ListOrderRoom = (props) => {
  // console.log(props.dataOrder)
  const [dataOrder, setDataOrder] = useState(props.dataOrder)
  useEffect(() => {
    const reversedList1 = [...props.dataOrder].reverse();
    const sortedData = [...reversedList1].sort((a, b) => {
      if (a.statusOrder === "10") return 1;
      if (b.statusOrder === "10") return -1;
      return 0;
    });
    setDataOrder(sortedData)
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