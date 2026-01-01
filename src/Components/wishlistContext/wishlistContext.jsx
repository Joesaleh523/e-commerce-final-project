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

  // ✅ Get Wishlist
  const getWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );

      // تأمين البيانات بالقيم الافتراضية
      const safeData = data.data.map((product) => ({
        _id: product._id || "",
        title: product.title || "",
        imageCover: product.imageCover || "",
        price: product.price || 0,
        category: {
          name: product?.category?.name || "uncategorized",
        },
      }));

      setWishlist(safeData);
    } catch (error) {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add
  const addToWishlist = async (productId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );

      // تأمين البيانات بعد الإضافة
      const safeData = data.data.map((product) => ({
        _id: product._id || "",
        title: product.title || "",
        imageCover: product.imageCover || "",
        price: product.price || 0,
        category: {
          name: product?.category?.name || "uncategorized",
        },
      }));

      setWishlist(safeData);
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  // ✅ Remove
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      setWishlist((prev) =>
        prev.filter((item) => item._id !== productId)
      );
      toast.success("Removed from wishlist 💔");
    } catch {
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
