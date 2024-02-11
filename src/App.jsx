
  import 'bootstrap/dist/css/bootstrap.css';
  import './App.css'
  import Router from './pages/router'
  import { BrowserRouter } from 'react-router-dom'
  import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer } from 'react-toastify';

  function App() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Router />
      </BrowserRouter>
    )
  }

  export default App
