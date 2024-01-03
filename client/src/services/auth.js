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








