import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ChatContextProvider } from "../contexts/chatContext";


const HomeLayout = () => {  
  const isLoggedIn = JSON.parse(localStorage.getItem('user'))?.token;
  let location = useLocation();

    return ( 
      <>
      {
      !isLoggedIn ? 
      <Navigate to="/account/auth/login" replace state={{ from: location }} /> : 
      <ChatContextProvider>
      <div className="home-module"><Outlet/></div>
      </ChatContextProvider>
      }      
      </>
     )


  
  };
export default HomeLayout;

