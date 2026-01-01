import { useContext, useState } from "react";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Cartcontext } from "../Cartcontext/CartContext";
import { WishlistContext } from "../wishlistContext/wishlistContext";
import useproduct from "../../Hooks/useproduct";
import { Heart } from "lucide-react";

export default function RecentProduct() {
  const { data, isLoading } = useproduct();
  const { addproducttocart } = useContext(Cartcontext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  const [animateId, setAnimateId] = useState(null);

  const isProductInWishlist = (id) =>
    wishlist?.some((item) => item._id === id);

  const toggleWishlist = async (id) => {
    if (!addToWishlist || !removeFromWishlist) return; // safety

    try {
      if (isProductInWishlist(id)) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }

      setAnimateId(id);
      setTimeout(() => setAnimateId(null), 400);
    } catch (error) {
      console.error("Wishlist toggle error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#08b623" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.map((product) => {
          const productId = product._id;
          const inWishlist = isProductInWishlist(productId);

          return (
            <div
              key={productId}
              className="relative border rounded-lg p-2 flex flex-col"
            >
              <Link
                to={`/prodectdetails/${productId}/${product.category?.name}`}
                className="flex-1"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="text-green-500 text-xs mt-2">
                  {product.category?.name}
                </h3>

                <h2 className="text-gray-700 text-sm font-medium">
                  {product.title.split(" ", 2).join(" ")}
                </h2>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-400 ml-1"></i>
                  </span>
                </div>
              </Link>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(productId)}
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  inWishlist ? "bg-pink-500 text-white" : "bg-white"
                }`}
              >
                <Heart fill={inWishlist ? "currentColor" : "none"} size={18} />
              </button>

              {/* Add to cart */}
              <button
                onClick={() => addproducttocart(productId)}
                className="mt-3 w-full bg-green-500 text-white rounded py-2 text-sm"
              >
                + Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
