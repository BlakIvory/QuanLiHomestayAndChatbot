
import actionTypes from './actionTypes';
import { apiRegister,apiLogin } from '../../services/auth';
export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        // console.log(response)
        if(response?.data.err === 0) 
        {
           
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data:{ token: response.data.data.token,
                      User : {
                        phone : response.data.data.phone,
                        name : response.data.data.name,
                        id : response.data.data._id
                      }
                    }
                
            })
        }else{
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }

    } catch (error) {
       dispatch({
        type: actionTypes.REGISTER_FAIL,
        data : null,
       }) 
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        console.log(response.data.User)
        if(response?.data.err === 0) 
        {  
            //  console.log(response.data)
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data:{ token: response.data.token,
                    User   : response.data.User,
                }
            })
        }else{
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
        }

    } catch (error) {
       dispatch({
        type: actionTypes.LOGIN_FAIL,
        data : null,
       }) 
    }
}

export const logout = () => ({
    type : actionTypes.LOGOUT
})