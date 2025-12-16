import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import useproduct from '../../Hooks/useproduct';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { Cartcontext } from './../Cartcontext/CartContext';
import axios from 'axios';

export default function Products() {

 let {data,isError,isFetching,isLoading,error}= useproduct();
 console.log(data);
  let{addproducttocart}=useContext(Cartcontext)
   const [AllProducts,setAllProducts]=useState(null)
   const[isloading,setisloading]=useState(false)
   function getallproduct(){
    setisloading(true)
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then(({data})=>{
console.log(data.data);
setAllProducts(data.data)
setisloading(false)
  })

}
   useEffect(()=>{
    getallproduct()

   },[])


   return <>
   
{isLoading? <div className='flex justify-center items-center h-screen'> <BounceLoader color="#08b623" /></div> : <div className="row">
{data?.map((product)=><div key={product.id} className='w-1/6  relative' >

<div className="product px-2  ">
<Link to={`/Prodectdetails/${product.id}/${product.category.name}`}>  <img src={product.imageCover} alt={product.title} />
<h3 className='text-green-400 text-sm'>{product.category.name}</h3>
<h1 className='text-gray-400 text-lg'>{product.title.split(" ",2).join(" ")}</h1>
<div className="flex justify-between items-center">
  {product.priceAfterDiscount?<><span className='font-light text-red-400 line-through'>{product.price}EGP</span>
<span className='font-light text-sm'>{product.priceAfterDiscount}EGP</span></>: <span className='font-light'>{product.price}EGP</span>}
<span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'> </i> </span>
 </div>

</Link>

<button onClick={()=>addproducttocart(product.id)}  type="button" className="text-white  btn  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+ Add</button>

{product.priceAfterDiscount? <span className="bg-red-500 z-20 text-red-400 left-1.5 text-xs font-medium me-2 px-2.5 py-2 rounded-sm absolute top-0 dark:bg-red-900 dark:text-red-300 border border-red-400">sale</span>:null}
</div>
</div>)}
  </div>}
</> 
}