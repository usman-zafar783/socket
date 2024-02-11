import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../contexts/accountContext"

function Navbar() {
    const { logout } = AccountContext();
    const navigate = useNavigate();
    const {user} = AccountContext()
  
    const onLogout = () =>{
      logout();
      navigate('/account/auth/login')
    }

    
  return (
    <>
    <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container">
            {/* <button className="test navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <h5 className="text-white mb-0">Logged in as <strong>{user?.username || 'N/A'}</strong></h5>
           <div className="btn-group">
           <button className="btn btn-warning rounded-0" onClick={onLogout}>Logout</button>
            <Link className="btn btn-info ms-3 rounded-0" to='/profile'>Profile</Link>
           </div>
            </div>
        </div>
    </header>
    </>
  )
}

export default Navbar
