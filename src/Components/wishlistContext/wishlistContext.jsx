import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = {
    token: localStorage.getItem("token"),
  };

  const addToWishlist = async (productId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      toast.success("Added to wishlist ❤️");
      setWishlist(data.data);
    } catch (error) {
      console.error("Add to wishlist error:", error.response?.data || error);
      toast.error("Failed to add to wishlist");
    } finally {
      setLoading(false);
    }
  };

  const getWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishlist(data.data);
    } catch (error) {
      console.error("Get wishlist error:", error.response?.data || error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        getWishlist,
        removeFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
