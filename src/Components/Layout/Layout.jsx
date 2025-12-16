import React, { useEffect, useState } from 'react'

import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Fotter/Fotter';
export default function Layout() {
   const [counter,setcounter]=useState(0)
   useEffect(()=>{},[])
  return <>
<Navbar/>
<div className='container mx-auto my-8 py-6'>
  <Outlet></Outlet>
  <Footer/>
</div>

  </>
}