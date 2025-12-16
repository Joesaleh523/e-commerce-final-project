import { useEffect, useState } from 'react';

import Slider from "react-slick";
import slide1 from "../../assets/images/blog-img-1.jpeg"
import slide2 from "../../assets/images/blog-img-2.jpeg"
import mainslide1 from "../../assets/images/slider-image-1.jpeg"
import mainslide2 from "../../assets/images/slider-image-2.jpeg"
import mainslide3 from "../../assets/images/slider-image-3.jpeg"
export default function Mainslider() {
     var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1 ,
    slidesToScroll: 1   ,
   autoplay:true
  }; 
  const [categories, setCategories] = useState([]);

   
   useEffect(()=>{},[])
  return <>
<div className="flex flex-wrap  mt-6">
    <div className="w-3/4">
  
  <Slider {...settings}>
    <img src={mainslide1} alt=""className=' h-[400px]' />
    <img src={mainslide2} alt=""  className='h-[400px]'/>
    <img src={mainslide3} alt="" className='h-[400px]' />
    
    </Slider> 

     </div>
     <div className="w-1/4">
     <img src={slide1} alt=""className='w-full h-[200px]' />
     <img src={slide2} alt=""className='w-full h-[200px]' />

 </div>
</div>
</>
}