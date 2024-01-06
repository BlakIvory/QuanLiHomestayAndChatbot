import React from 'react'
import { Routes,Route} from 'react-router-dom'
import DashBoard from '../../Pages/DashBoard'
import Inventory from '../../Pages/Inventory'
import Customers from '../../Pages/Custumer'
import Orders from '../../Pages/Orders'
const AppRoutes = () => {
  return (
   
        <Routes>
            <Route path="/" element={<DashBoard/>}></Route>
            <Route path="/inventory" element={<Inventory/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/orders" element={<Orders/>}></Route>
        </Routes>
   
  )
}

export default AppRoutes
