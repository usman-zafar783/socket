
// context.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../_helpers/JWT_Interceptor'
const accountContext = createContext();


const AccountContextProvider = ({children}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null );
    const [isLogin, setIsLogin] = useState(false);

    //////////////   Account Methods
    
    const login = async (data) =>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/auth/login`, data);
            storeInfo(response.data);
            toast.success('Login Successful!');
            return true;
            
          } catch (error) {
            toast.error( error?.response?.data?.msg || 'Something went wrong!');
            console.error('Login failed:', error);  
            return false
        } 
    }
    

    const register = async (data) =>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_KEY}/auth/register`, data);
            storeInfo(response.data);
            toast.success('Registeration Successful!');
            return true;

          } catch (error) {
            toast.error( error?.response?.data?.msg || 'Something went wrong!');
            console.error('Registeration failed:', error);
            return false
        } 
    }

    const logout = async () =>{
        setIsLogin(false);
        
        ///  removing LocalStorage Items
        localStorage.clear();
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('user', '{}');
        localStorage.setItem('expiresIn', '0');

        setUser(null);

    }
    
    const forgotPassword = async (data) =>{
        try {
            await axios.post(`${import.meta.env.VITE_APP_API_KEY}/auth/forgot-password`, data);
            toast.success('Please check your Email inbox!!');
            return true;
            
          } catch (error) {
            toast.error( error?.response?.data?.msg || 'Something went wrong!');
            console.error(error);  
            return false
        } 
    }
    
    const resetPassword = async (data) =>{
        try {
            await axios.post(`${import.meta.env.VITE_APP_API_KEY}/auth/reset-password`, data);
            toast.success('Password Reset Successfuly');
            return true;
            
          } catch (error) {
            toast.error( error?.response?.data?.msg || 'Something went wrong!');
            console.error(error);  
            return false
        } 
    }
    
    const updateProfile = async (data) =>{
        try {
            await api.patch(`${import.meta.env.VITE_APP_API_KEY}/chats/update-profile`, data);
            toast.success('Profile Updated!');
          } catch (error) {
            toast.error( error?.response?.data?.msg || 'Something went wrong!');
            console.error(error);  
        } 
    }

    
    //////////////   Store User info in LocalStorage

        const storeInfo = async (res) =>{
            setIsLogin(true)
            localStorage.setItem('user', JSON.stringify(res?.user));
            localStorage.setItem('STATE', JSON.stringify(true));
            localStorage.setItem('expiresIn', JSON.stringify(res?.user?.expiresIn));
            localStorage.setItem('isVerified', JSON.stringify(res?.user?.isVerified));
            setUser(res?.user)
            return res;
        }

        const isLoggedIn = () =>{
            console.log('call');
            if(localStorage.getItem('STATE') === 'true'){
                setIsLogin(true)
            }else{
                setIsLogin(false)
            }
            return isLogin
        }

    return (
        <accountContext.Provider value={{
            setUser,
            user,
            login,
            register,
            logout,
            forgotPassword,
            isLoggedIn,
            resetPassword,
            updateProfile}}>
            {children}
        </accountContext.Provider>
    )
}    

const AccountContext = () =>{
    return useContext(accountContext)
}   


export { AccountContext, AccountContextProvider};