import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'post',
            url: '/user/register',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLogin = (payload) => new Promise(async(resolve, reject)=>{
    try {
        
        const response = await axiosConfig({
            method: 'post',
            url: '/user/login',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiInfoUser = (payload) => new Promise(async(resolve, reject)=>{
    try {
        // console.log(payload)
        const response = await axiosConfig({
            method: 'post',
            url: '/user/info',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})








