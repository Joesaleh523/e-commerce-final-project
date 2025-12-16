import axios from "axios";
import { Check } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { data } from "react-router-dom";


export let Cartcontext=createContext(null);
export default function CartContextProvider({children}){
    const [cartdetails,setcartdetails]=useState(null)
       const [loading,setisloading]=useState(null)
    let headers={
        token:localStorage.getItem('token')
    }
     const [wishlist, setWishlist] = useState([]);
    function getcart(){
        setisloading(true )
        axios.get(' https://ecommerce.routemisr.com/api/v1/cart',{
            headers
        }).then(({data})=>{
    // console.log(data);
    setcartdetails(data)
}).catch((error)=>{
     console.log(error);
})  .finally(()=>{
    setisloading(false)
})
    }
    useEffect(()=>{
        getcart()
    },[])
function removecartitem(productId){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers
    }).then(({data})=>{
        setcartdetails(data)
        console.log(data);
        toast.success('prodect deleted successfully')
    })

}
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishlist(data?.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

const addToWishlist = async (productId) => {
  try {
    setisloading(true);
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    );
    toast.success("Added to wishlist ❤️");
    setWishlist((prev) => [...prev, { _id: productId }]); 
  } catch (error) {
    console.error("Add to wishlist error:", error.response?.data || error);
    toast.error("Failed to add to wishlist");
  } finally {
    setisloading(false);
  }
};
const removeFromWishlist = async (productId) => {
  try {
    setisloading(true);
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers }
    );
    toast.success("Removed from wishlist");
    setWishlist((prev) => prev.filter((item) => item._id !== productId)); 
  } catch (error) {
    console.error("Remove from wishlist error:", error.response?.data || error);
    toast.error("Failed to remove from wishlist");
  } finally {
    setisloading(false);
  }
};

function updatecartitem(productId,count){
axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
       count
    },{
        headers
    }).then(({data})=>{
setcartdetails(data)
        console.log(data);
        toast.success('Product updated')
    })

}
  async function Checkout(cartId, url, values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
      shippingAddress: values,
    }, { headers });
  }


function Clearcart(){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then(({data})=>{
 getcart()
        // console.log(data);
        toast.success('Cart is empty')
    })

}



    function addproducttocart(productId){
axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
    productId
},{
    headers 
}).then(({data})=>{
    console.log(data);
setcartdetails(data)
toast.success(data?.message )
}).catch(({data})=>{
     console.log(data);
toast.error(data?.message )
     
})
    }
    return <Cartcontext.Provider value={{addproducttocart, wishlist,
        addToWishlist,
        removeFromWishlist,removecartitem,Clearcart,getcart,cartdetails,loading,updatecartitem,Checkout}}>
{children}
    </Cartcontext.Provider>
}