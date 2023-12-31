import React from 'react'
import axiosConfig from '../axiosConfig'


export const getOrders = () => {
  return (
    fetch('https://dummyjson.com/carts/1')
      .then(res => res.json())
  )
}

export const getRevenue = () => {
  return (
    fetch('https://dummyjson.com/carts')
      .then(res => res.json())

  )
}
export const getInventory = () => {
  return (fetch('https://dummyjson.com/products')
  .then(res => res.json()))
}
export const getCustomer = () => {
  return fetch('https://dummyjson.com/users')
  .then(res => res.json())
}


export const apiGetAllSector = () => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'get',
            url: '/admin/getAllSector',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetAllRoom = () => new Promise(async(resolve, reject)=>{
  try {
      
      const response = await axiosConfig({
          method: 'get',
          url: '/admin/getAllRoom',
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})
export const apiGetAllUser = () => new Promise(async(resolve, reject)=>{
  try {
      
      const response = await axiosConfig({
          method: 'get',
          url: '/admin/getAllUser',
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})