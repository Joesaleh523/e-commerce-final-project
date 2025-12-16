import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from './../Context/Authcontext';

export default function Login() {
    const [errormessage,SeterrorMessage]=useState(null)
   const [isloading,setisloading]=useState(null)
 const navigate = useNavigate();
let {token,settoken}=useContext(AuthContext)
  console.log(token,settoken);
 
  function handleLogin (values) {
    setisloading(true);
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem('token', res.data.token);
      settoken(res.data.token)
        navigate('/');
      })
      .catch((error) => {
        SeterrorMessage(error.response?.data?.message || 'Login failed');
      })
      .finally(() => {
        setisloading(false);
      });
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
<>
<form className="max-w-7xl" onSubmit={formik.handleSubmit}>
<h1 className='text-3xl font-bold  my-10'>Login now</h1>
  { errormessage? <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span class="font-medium">{errormessage}</span> 
</div>: null}



  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange } onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-greensparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Email</label>
  </div>
       {formik.errors.email &&formik.touched.email? <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span class="font-medium">{formik.errors.email}</span> 
</div>:null}



   <div className="relative z-0 w-full mb-5 group">
      <input type="Password" name="password" value={formik.values.password} onChange={formik.handleChange } onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-greensparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
        {formik.errors.password &&formik.touched.password? <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div>:null}

<div className='flex justify-between'>
<Link to={`/Forgetpassword`}
className='text-2xl'>
  Forget password ?
</Link>
<div>
  
<button
        disabled={isloading}
        type="submit"
        className="text-white bg-black hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-green-700 dark:focus:ring-blue-800"
      >
        {isloading ? <i className='fas fa-spin fa-spinner'></i> : 'Login Now'}
      </button>
</div>

</div>

  </form>



</>
  );
}