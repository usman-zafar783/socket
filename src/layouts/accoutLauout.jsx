import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AccoutLauout = () => {  
    console.log('Account module loaded');

    const isLoggedIn = JSON.parse(localStorage.getItem('user'))?.token;
    const location = useLocation();

    return ( 
      <>
      {
      isLoggedIn ? 
      <Navigate to="/" replace state={{ from: location }} /> : 
      <div className="accout-module"><Outlet/></div>
      }
      
      </>
     )
}

export default AccoutLauout
