import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from "react-slick";

export default function Categoriesslider() {
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8 ,
    slidesToScroll: 3,
  }; 
     const [Categories,setCategories]=useState(null)
       function getallCategories(category){
axios.get('https://ecommerce.routemisr.com/api/v1/categories')
.then(({data})=>{
  console.log(data.data);
setCategories(data.data)
})
   }
   useEffect(()=>{
    getallCategories()
   },[])
  return <>
  <div className='my-6'>
  <Slider {...settings}>
     {Categories?.map((category)=><div>
      <img src={category.image} className='h-[200px] w-full' alt="" />
      <h4 className='font-light mt-2'>{category.name} </h4>
     </div>) }
    
    </Slider> 
  </div>
  
  </>
}
