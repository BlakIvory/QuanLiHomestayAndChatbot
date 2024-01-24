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
