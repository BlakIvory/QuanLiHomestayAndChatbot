import React from 'react'
import { Routes,Route} from 'react-router-dom'
import DashBoard from '../../Pages/DashBoard'
import Inventory from '../../Pages/Inventory'
import Customers from '../../Pages/Custumer'
import Orders from '../../Pages/Orders'
import Room from '../../Pages/Room'
import Sector from '../../Pages/Sector'
const AppRoutes = () => {
  return (
   
        <Routes>
            <Route path="/" element={<DashBoard/>}></Route>
            <Route path="/inventory" element={<Inventory/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/orders" element={<Orders/>}></Route>
            <Route path="/sectors" element={<Sector/>}></Route>
            <Route path="/rooms" element={<Room/>}></Route>
        </Routes>
   
  )
}

export default AppRoutes
