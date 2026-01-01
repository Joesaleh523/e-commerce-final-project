import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from './../Context/Authcontext';

export default function Login() {
  const [errormessage, setErrorMessage] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { settoken } = useContext(AuthContext);

  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        settoken(res.data.token);
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || 'Login failed');
      })
      .finally(() => setIsLoading(false));
  }

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login Now
        </h1>

        {errormessage && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
            {errormessage}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-1 text-sm text-gray-600">
            Email 
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-1 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <Link
            to="/Forgetpassword"
            className="text-sm text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isloading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium"
        >
          {isloading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            'Login'
          )}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/Register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
