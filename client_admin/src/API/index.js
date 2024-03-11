import React from 'react'
import axiosConfig from '../axiosConfig'

export const apiAdminRegister = (payload) => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'post',
            url: '/admin/register',
            data: payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiAdminLogin = (payload) => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'post',
            url: '/admin/login',
            data: payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

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

export const apiGetAllAdmin = () => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'get',
            url: '/admin/getAllAdmin',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
  })

export const apiAddRoom = (payload) => new Promise(async(resolve, reject)=>{
  try {
      console.log(payload)
      const response = await axiosConfig({
          method: 'post',
          url: '/admin/addRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})


export const apiDeleteRoom = (payload) => new Promise(async(resolve, reject)=>{
  try {
      console.log(payload)
      const response = await axiosConfig({
          method: 'post',
          url: '/admin/deleteRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})


export const apiConfirmOrderRoom = (payload) => new Promise(async(resolve, reject)=>{
  try {
      console.log(payload)
      const response = await axiosConfig({
          method: 'post',
          url: '/admin/confirmOrderRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})
export const apiCompleteOrderRoom = (payload) => new Promise(async(resolve, reject)=>{
  try {
      console.log(payload)
      const response = await axiosConfig({
          method: 'post',
          url: '/admin/completeOrderRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})
export const apiDeleteOrderRoom = (payload) => new Promise(async(resolve, reject)=>{
  try {
      console.log(payload)
      const response = await axiosConfig({
          method: 'post',
          url: '/admin/deleteOrderRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})

export const apiGetInfoRoom = (payload) => new Promise(async(resolve, reject)=>{
  try {

      const response = await axiosConfig({
          method: 'post',
          url: '/admin/infoRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})

export const apiAddSector = (payload) => new Promise(async(resolve, reject)=>{
  try {
      console.log(payload)
      const response = await axiosConfig({
          method: 'post',
          url: '/admin/addRoom',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})

export const apiGetInfoSector = (payload) => new Promise(async(resolve, reject)=>{
  try {

      const response = await axiosConfig({
          method: 'post',
          url: '/admin/infoSector',
          data:payload,
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})



export const apiAddAdmin = (payload) => new Promise(async(resolve, reject)=>{
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/admin/addAdmin',
            data:payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
  })
  
  export const apiDeleteAdmin = (payload) => new Promise(async(resolve, reject)=>{
    try {
        // console.log(payload)
        const input = {
            "idAdmin": payload._id
        }
        const response = await axiosConfig({
            method: 'post',
            url: '/admin/deleteAdmin',
            data: input,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
  })
  