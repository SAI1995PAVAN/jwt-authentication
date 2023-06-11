import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer,toast} from 'react-toastify';



const Secret = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  

  const handleLogout = () => {
    removeCookie('token')
    navigate('/login')
  }

  const generateSuccess = (msg) => {
    toast.success(msg, {
      position: 'top-right',
      autoClose: 500

    });
  };


  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        navigate('/login')
      } else {
        const result = await axios.post('http://localhost:5000', {}, { withCredentials: true })
        if (!result.data.authorized) {
          removeCookie('token');
          navigate('/login')
        } else {
          generateSuccess(`Hi ${result.data.user}`)
        }
      }
    }
    verifyUser()
  }, [cookies, navigate, removeCookie]);

  return (
  <>
    <div className='private'>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
     
      </div>
      <ToastContainer />
      </>
  )
}

export default Secret