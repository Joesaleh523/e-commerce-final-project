import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Layout from "./Components/Layout/Layout";
import Notfound from "./Components/Notfound/Notfound";
import Brands from "./Components/Brands/Brands";
import AuthContextProvider from "./Components/Context/Authcontext";
import ProtectedRoute from "./Components/Prodectroute.jsx/ProductRoute";
import Login from './Components/Login/Login';
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Prodectdetails from "./Components/Prodectdetails/Prodectdetails";
import CartContextProvider from "./Components/Cartcontext/CartContext";
import  { Toaster } from 'react-hot-toast';
import Checkout from "./Components/Checkout/Checkout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import WishlistContextProvider from "./Components/wishlistContext/wishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import ForgetPassword from "./Components/Forgetpassword/Forgetpassword";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";

let query=new QueryClient()

let x = createBrowserRouter([
  {
    path: "",element: <Layout />,children: [
      { index: true, element:<ProtectedRoute> <Home/>  </ProtectedRoute> },
      { path: "Login", element: <Login/> },
      { path: "Products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: "Categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: "Wishlist", element: <Wishlist> <Categories /> </Wishlist> },
      { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: "Checkout", element: <ProtectedRoute> <Checkout /> </ProtectedRoute> },
      { path: "Register", element: <Register/> },
      { path: "*", element:   <Notfound /> },
      { path: "Brands", element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: "Forgetpassword", element: <ForgetPassword />},
      { path: "prodectdetails/:id/:category", element: <ProtectedRoute> <Prodectdetails  /></ProtectedRoute> },

 
    ],
  },
]);

function App() {
  return (
    <>
      
{/* <Provider store={store}> */}
   <WishlistContextProvider>
       <QueryClientProvider client={query}>
        <AuthContextProvider>
        <CartContextProvider>
    <RouterProvider router={x}></RouterProvider>
          <Toaster />   
        </CartContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
 </WishlistContextProvider>
             
{/* </Provider> */}

    </>
  );
}
export default App;
