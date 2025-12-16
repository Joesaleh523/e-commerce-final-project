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

      {!wishlist || wishlist.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {wishlist.map((product) => {
            const productId = product?._id || Math.random();
            const productTitle =
              product?.title?.split(" ", 3).join(" ") || "No Title";
            const productImage =
              product?.imageCover || "https://via.placeholder.com/150";
            const productPrice = product?.price
              ? `${product.price} EGP`
              : "No Price";

            return (
              <div
                key={productId}
                className="border p-2 rounded-lg shadow-md relative bg-white"
              >
                <button
                  onClick={() => {
                    removeFromWishlist(productId);
                    setAnimateId(productId);
                    setTimeout(() => setAnimateId(null), 400);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition bg-pink-500 text-white ${
                    animateId === productId ? "animate-heart" : ""
                  }`}
                >
                  <Heart fill="currentColor" />
                </button>

                <Link
                  to={`/prodectdetails/${productId}/${
                    product?.category?.name || "unknown"
                  }`}
                >
                  <img
                    src={productImage}
                    alt={productTitle}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-sm text-gray-700 mt-2">{productTitle}</h3>
                </Link>

                <p className="text-green-500 font-medium mt-1">{productPrice}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
