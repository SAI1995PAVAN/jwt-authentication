import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password:'',
  })

  const handleInputChange = (e) => {
  setValues({...values,[e.target.name]:e.target.value})
  }
  
  const generateError = (error) =>
  toast.error(error, {
    position: "bottom-right",
    autoClose: 500
  });

  const generateSuccess = (msg) => {
    toast.success(msg, {
      position: 'top-right',
      onClose: () => {
        navigate('/')
      },
      autoClose: 500
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/login",
        {...values},
        {withCredentials:true}
      )
      console.log(result)
      generateSuccess('login successful')
      // if (data) {
      //   if (data.errors) {
      //     generateError(data.errors)
      //   } else {
      //     navigate("/");
      //   }
      // }
      
    } catch (error) {
      console.log(error)
      let {message}=error.response.data
      generateError(message)
     
    }
  }
  

  return (
    <div className='container'>
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name='email'
            onChange={handleInputChange}
            value={values.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name='password'
            onChange={handleInputChange}
            value={values.password}
          />
          
        </div>
        <button
          type='submit'
          
        >Login
        </button>
        <span>
        Not registered then <Link to='/register'>Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login