import React, {  useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../Context/Authcontext";
import { NavLink, useNavigate } from "react-router-dom";
import { Cartcontext } from "../Cartcontext/CartContext";

export default function Navbar() {
  let navigate=useNavigate
  let {cartdetails}=useContext(Cartcontext)
  let{token,settoken}=useContext(AuthContext)
  function Logout(){
localStorage.clear();
settoken(null);
navigate('/Login')
  }
  useEffect(() => {}, []);
  return (
    <>
   <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50 py-2  ">
        <div className="flex-col lg:flex-row items-center flex container mx-auto justify-between">
          <div>
              <img src={logo} width={200} alt="freshcort" />
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            
   {token?       
       <ul className="flex flex-col lg:flex-row items-center">
        <li>
          <NavLink to={''} className="mx-2 text-lg text-slate-900 font-light">Home</NavLink>
        </li>
        <li>
          <NavLink to={'Brands'} className="mx-2 text-lg text-slate-900 font-light">Brands</NavLink>
        </li>
        <li>
          <NavLink to={'Categories'} className="mx-2 text-lg text-slate-900 font-light">categories</NavLink>
        </li>
           <li>
          <NavLink to={'Products'} className="mx-2 text-lg text-slate-900 font-light">Products</NavLink>
        </li>
        <li>
          <NavLink to={'cart'} className="mx-2 text-lg text-slate-900 font-light">cart</NavLink>
        </li>
          <li>
          <NavLink to={'WishList'} className="mx-2 text-lg text-slate-900 font-light">Wishlist</NavLink>
        </li>

       </ul>:null}
          </div>
          <div>
            <ul className="flex flex-col lg:flex-row items-center">
             {token?
             <>
             <NavLink to={'/Cart'}><li className="relative"><i className="fas fa-cart-shopping text-2xl"></i>
         {cartdetails?.numOfCartItems?    <div className="text-sm size-5 absolute -top-3 -left-3 bg-green-600 text-center rounded-full text-white">
            {cartdetails?.numOfCartItems}
             </div>:null}
             </li></NavLink>
              <li><NavLink to={'Logout'} onClick={Logout} className="mx-2 text-lg  text-slate-900 font-light ">Logout</NavLink></li></>:<><li>
          <NavLink to={'Login'} className="mx-2 text-lg text-slate-900 font-light">Login</NavLink>
        </li>
         <li>
          <NavLink to={'Register'} className="mx-2 text-lg text-slate-900 font-light">Register</NavLink>
        </li>
             </>}
        
          

     
            </ul>
          </div>
        </div>
      </nav> 
    </>
  );
}

