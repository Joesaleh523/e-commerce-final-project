import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../wishlistContext/wishlistContext";
import { BounceLoader } from "react-spinners";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, getWishlist, removeFromWishlist, loading } =
    useContext(WishlistContext);

  const [animateId, setAnimateId] = useState(null);

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#08b623" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-pink-600">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your wishlist is empty
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {wishlist.map((product) => {
            const productId = product._id;

            return (
              <div
                key={productId}
                className="border p-2 rounded-lg shadow-md relative bg-white"
              >
                {/* ❤️ Remove Heart */}
                <button
                  onClick={() => {
                    removeFromWishlist(productId);
                    setAnimateId(productId);
                    setTimeout(() => setAnimateId(null), 300);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full 
                  bg-red-500 text-white transition
                  ${animateId === productId ? "scale-125" : ""}`}
                >
                  <Heart fill="currentColor" size={18} />
                </button>

                <Link
                  to={`/prodectdetails/${productId}/${product?.category?.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-sm text-gray-700 mt-2">
                    {product.title.split(" ", 3).join(" ")}
                  </h3>
                </Link>

                <p className="text-green-600 font-medium mt-1">
                  {product.price} EGP
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
