import React from 'react'
import { useQuery } from '@tanstack/react-query';
import  axios from 'axios';

export default function useproduct() {
   function getrecent(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
 let requestObject= useQuery({
queryKey:['RecentProduct'],
queryFn:getrecent,
refetchInterval:3000,
// staleTime:800,
// retry:8,
// retryDelay:1000
// retry:()=>()
  select:(data)=>data.data.data,
  gcTime:4000,
  })  

  
 
    return  requestObject
  
}
