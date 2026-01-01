import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from './../Context/Authcontext';

export default function Register() {
  const { settoken } = useContext(AuthContext);
  const [errormessage, setErrorMessage] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleregister(values) {
    setIsLoading(true);
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        settoken(res.data.token);
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || 'Register failed');
      })
      .finally(() => setIsLoading(false));
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name must be max 10 characters')
      .required('Name is required'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(
        /^(010|011|012|015)[0-9]{8}$/,
        'Phone must be Egyptian number'
      )
      .required('Phone is required'),
    password: yup
      .string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        'Password must start with capital letter'
      )
      .required('Password is required'),
    rePassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Re-password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleregister,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register Now
        </h1>

        {errormessage && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
            {errormessage}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
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
        <div className="mb-4">
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

        {/* Re Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">
            Re-Password
          </label>
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.rePassword}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-600">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isloading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium"
        >
          {isloading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            'Register'
          )}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/Login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
