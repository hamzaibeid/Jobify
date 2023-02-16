import {useReducer,useContext } from "react";
import React from "react";
import reducer from "./reducers";
import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS} from "./actions";
import axios from 'axios';


const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user: user? JSON.parse(user):null,
    token:token,
    userLocation:userLocation||'', 
    jobLocation:'',
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    const displayAlert = () => {
        dispatch({type:DISPLAY_ALERT});
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(()=>{dispatch({type:CLEAR_ALERT});},3000)
    };

    const AddUserToLocalStorage =  ({user,token,location}) =>{
        localStorage.removeItem('user',JSON.stringify(user));
        localStorage.removeItem('token',token);
        localStorage.removeItem('location',location);
    }
    const RemoveUserToLocalStorage =  ({user,token,location}) =>{
        localStorage.setItem('user');
        localStorage.setItem('token');
        localStorage.setItem('location');
    }
    

    const registerUser = async ({currentUser}) =>{
    dispatch({type: REGISTER_USER_BEGIN})
    try {
        const response = await axios.post('/api/v1/auth/register', currentUser)
        const {user,token,location} = response.data;
        dispatch({type:REGISTER_USER_SUCCESS,payload:{user,token,location}})
        AddUserToLocalStorage({user,token,location})
        console.log(user,token,location);
        
    } catch (error) {
        console.error(error.response);
        dispatch({
            type: REGISTER_USER_ERROR,
            payload:{msg:error.response.data.msg}
        })
    }
    clearAlert();
    }
    const loginUser = async ({currentUser}) =>{
        console.log('pls');
        dispatch({type: LOGIN_USER_BEGIN})
    try {
        const {data} = await axios.post('/api/v1/auth/login', currentUser)
        const {user,token,location} = data;
        dispatch({type:LOGIN_USER_SUCCESS,payload:{user,token,location}})
        AddUserToLocalStorage({user,token,location})
        console.log(user,token,location);
        
    } catch (error) {
        console.error(error.response);
        dispatch({
            type: LOGIN_USER_ERROR,
            payload:{msg:error.response.data.msg}
        })
    }
    clearAlert();
    }

    return (<AppContext.Provider value={{...state,displayAlert,registerUser,loginUser}}>
        {children}</AppContext.Provider>
    )
}
const useAppContext = () => {
return useContext(AppContext);
}
export {AppProvider,initialState,useAppContext}