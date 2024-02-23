import axiosConfig from '../axiosConfig'

export const apiGetAllRoom = () => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'get',
            url: '/user/getAllRoom',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiPostOrderRoom = (payload) => new Promise(async(resolve, reject)=>{
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/user/orderRoom',
            params: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})



export const apiGetInfoRoom = (payload) => new Promise(async(resolve, reject)=>{
    try {
        // console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/user/infoRoom',
            data : payload,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})