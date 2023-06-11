import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Register = () => {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password:'',
  })


  // useEffect(() => {
  //   if (cookies.token) {
  //     navigate("/");
  //   }
  // }, [cookies, navigate]);

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
        navigate('/login')
      },
      autoClose: 500
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/register",
        {...values},
        {withCredentials:true}
      )
      console.log(result)
      generateSuccess('user created')
      // if (data) {
      //   if (data.errors) {
      //     generateError(data.errors)
      //   } else {
      //     navigate("/");
      //   }
      // }
      
    } catch (error) {
      console.log(error)
      const result=error.response.data.errors
        generateError(result)
    }
  }

 
  return (
    <div className='container'>
      <h2>Register Account</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
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
          
        >Register
        </button>
        <span>
          Already have account then <Link to='/login'>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register