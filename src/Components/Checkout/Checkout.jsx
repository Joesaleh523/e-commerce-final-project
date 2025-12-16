import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Cartcontext } from "../Cartcontext/CartContext";

export default function Checkout() {
  const { Checkout, cartdetails } = useContext(Cartcontext);
   const [isloading,setisloading]=useState(null)

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      const cartId = cartdetails?.data?._id;
      if (!cartId) {
        console.error("No cartId available. cartdetails:", cartdetails);
        return;
      }

      try {
        const { data } = await Checkout(cartId, window.location.origin, values);
        if (data?.session?.url) {
          window.location.href = data.session.url; 
        } else {
          console.warn("No checkout URL in response:", data);
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    },
  });

  if (!cartdetails) {
    return <p className="text-center">Loading your cart...</p>;
  }

  return (
<>
<form className="max-w-7xl" onSubmit={formik.handleSubmit}>
<h1 className='text-3xl font-bold  my-10'>Pay now</h1>




  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange } onBlur={formik.handleBlur} id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-greensparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">details</label>
  </div>
   <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange } onBlur={formik.handleBlur} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-greensparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">phone</label>
  </div>

   <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange } onBlur={formik.handleBlur} id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-greensparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label htmlFor="floating_city " className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">city</label>
  </div>
 
 


<button    disabled={isloading}
        type="submit" className="mt-5 w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
     {isloading ? <i className='fas fa-spin fa-spinner'></i> : 'Pay Now'}
</span>
</button>


  </form>


</>
  );
}