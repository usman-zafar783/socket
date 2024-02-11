
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar"
import { AccountContext } from "../../contexts/accountContext"

function Home() {
  const {user} = AccountContext();
  console.log(user);
  return (
    <div>
       <Navbar/>

      <main>

        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Welcome Back {user?.username}</h1>
              <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
              <p>
                <Link className="btn btn-lg btn-warning rounded-0 my-2"
                 to="/chatroom" >Start Chat</Link>
              </p>
            </div>
          </div>
        </section>



</main>
    </div>
  )
}

export default Home
