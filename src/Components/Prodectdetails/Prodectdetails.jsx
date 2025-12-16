import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Cartcontext } from '../Cartcontext/CartContext';
export default function Prodectdetails() {
    let{addproducttocart}=useContext(Cartcontext)
     const[productdetails,setproductdetails]=useState(null)
     const[relatedproducts,setrelatedproducts]=useState(null)
       var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    let {id,category}=useParams()
    console.log(category);
     function   getproductdetails(id){
axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then(({data})=>{
    console.log(data.data);
   setproductdetails(data.data)
}
)
 }
     function   getallproducts(category){
axios.get('https://ecommerce.routemisr.com/api/v1/products')
.then(({data})=>{
    console.log(data.data);
   let allproducts=data.data
   let related=allproducts.filter((product)=>product.category.name==category)
  setrelatedproducts(related)
   
}
)
     } 
       useEffect(()=>{
    getproductdetails(id)  
getallproducts(category)
   },[])


 return <>
<div className="row mt-20">
    <div className="w-1/4">
        <Slider {...settings}>
    {productdetails?.images.map((src)=><img src= {src} className='w-100  ' alt={productdetails?.title}  />)}
    </Slider>
    </div>
<div className="w-3/4">
<h1 className='text-lg font-normal text-gray-600'>{productdetails?.title}</h1>
<p className='text-gray-900 font-light m-6 '>{productdetails?.description}</p>



<div className="flex justify-between items-center">
  {productdetails?.priceAfterDiscount?<><span className='font-light text-red-400 line-through'>{productdetails?.price}EGP</span>
<span className='font-light text-sm'>{productdetails?.priceAfterDiscount}EGP</span></>: <span className='font-light'>{productdetails?.price}EGP</span>}
<span>{productdetails?.ratingsAverage} <i className='fas fa-star text-yellow-300'> </i> </span>
 </div>
<button type="button" onClick={()=>addproducttocart(productdetails.id)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-7">+ Add</button>

</div>
</div>
<div className="row">
  {relatedproducts  ?.map((product)=><div key={product.id} className='w-1/6  relative'>
<div className="product px-2  ">
 <Link to={`/Productdetails/${product.id}/${product.category.name}`}>
  <img src={product.imageCover} alt={product.title} />
<h3 className='text-green-400 text-sm'>{product.category.name}</h3>
<h3 className='text-gray-400 text-lg'>{product.title.split(" ",2).join(" ")}</h3>
<div className="flex justify-between items-center">
  {product.priceAfterDiscount?<><span className='font-light text-red-400 line-through'>{product.price}EGP</span>
<span className='font-light text-sm'>{product.priceAfterDiscount}EGP</span></>: <span className='font-light'>{product.price}EGP</span>}
<span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'> </i> </span> </div>
 </Link>
<button type="button" onClick={()=>addproducttocart(productdetails.id)} className="text-white bg-gradient-to-r btn from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+ Add</button>

{product.priceAfterDiscount? <span class="bg-red-500 z-20 text-red-400 left-1.5 text-xs font-medium me-2 px-2.5 py-2 rounded-sm absolute top-0 dark:bg-red-900 dark:text-red-300 border border-red-400">sale</span>:null}
</div>
</div>)}
</div>
  </>
}
