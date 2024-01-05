import actionTypes from "../actions/actionTypes";

const initState = {
    IsLoggedIn: false,
    token: null,
    msg: "",
    phoneUser: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:{
            // console.log(action.data.phoneUser);
            return {
                ...state,
                IsLoggedIn: true,
                token: action.data.token,
                phoneUser: action.data.phoneUser
                
            };}

        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                IsLoggedIn: false,
                msg: action.data,
                token: null,
                phoneUser: null
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                IsLoggedIn: false,
                token: null,
                msg: "",
                phoneUser: null
            };

        default:
            return state;
    }
};
export default authReducer;
