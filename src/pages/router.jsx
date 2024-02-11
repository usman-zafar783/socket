import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./account/register";
import Login from "./account/login";
import AccoutLauout from "../layouts/accoutLauout";
import HomeLayout from "../layouts/homeLayout";
import ForgotPassword from "./account/ForgotPassword";
import ResetPassword from "./account/ResetPassword";
import ChatRoom from "./ChatRoom";
import Profile from "./Profile";

const Router = () => {
    return (
      <Routes>

       <Route path="/" element={<HomeLayout/>}>
        <Route path="" element={ <Home />}/>
        <Route path="profile" element={ <Profile />}/>
        <Route path="chatroom" element={ <ChatRoom />}/>
       </Route>

       <Route path="account" element={<AccoutLauout/>}>
        <Route path="auth/login" element={ <Login />}/>
        <Route path="auth/register" element={ <Register />} />
        <Route path="auth/forgot-password" element={ <ForgotPassword />}/>
        <Route path="auth/reset-password/:id/:token" element={ <ResetPassword />}/>
       </Route>

      </Routes>
      
    )
};

export default Router;