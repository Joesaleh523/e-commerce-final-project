import { useContext, useEffect, useState } from "react";
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

  const isProductInWishlist = (id) => wishlist?.some((item) => item._id === id);

  const toggleWishlist = (id) => {
    if (isProductInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
    setAnimateId(id);
    setTimeout(() => setAnimateId(null), 400);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#08b623" />
      </div>
    );
  }

  return (
    <div className="row">
      {data?.map((product) => {
        const productId = product?._id || Math.random();
        const productTitle =
          product?.title?.split(" ", 2).join(" ") || "No Title";
        const productImage =
          product?.imageCover || "https://via.placeholder.com/150";
        const productPrice = product?.priceAfterDiscount
          ? `${product.priceAfterDiscount} EGP`
          : `${product?.price || "No Price"} EGP`;

        const inWishlist = isProductInWishlist(productId);

        return (
          <div key={productId} className="w-1/6 relative">
            <div className="product px-2">
              <Link
                to={`/prodectdetails/${productId}/${
                  product?.category?.name || "unknown"
                }`}
              >
                <img src={productImage} alt={productTitle} />
                <h3 className="text-green-400 text-sm">
                  {product?.category?.name || "No Category"}
                </h3>
                <h1 className="text-gray-400 text-lg">{productTitle}</h1>
                <div className="flex justify-between items-center">
                  {product?.priceAfterDiscount ? (
                    <>
                      <span className="font-light text-red-400 line-through">
                        {product?.price}EGP
                      </span>
                      <span className="font-light text-sm">
                        {product?.priceAfterDiscount}EGP
                      </span>
                    </>
                  ) : (
                    <span className="font-light">
                      {product?.price || "No Price"} EGP
                    </span>
                  )}
                  <span>
                    {product?.ratingsAverage || 0}{" "}
                    <i className="fas fa-star text-yellow-300"> </i>
                  </span>
                </div>
              </Link>

              <button
                onClick={() => toggleWishlist(productId)}
                type="button"
                className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
                  inWishlist ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-600"
                } ${animateId === productId ? "animate-heart" : ""}`}
              >
                <Heart fill={inWishlist ? "currentColor" : "none"} />
              </button>

              <button
                onClick={() => addproducttocart(productId)}
                type="button"
                className="text-white btn bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                + Add
              </button>

              {product?.priceAfterDiscount ? (
                <span className="bg-red-500 z-20 text-red-400 left-1.5 text-xs font-medium me-2 px-2.5 py-2 rounded-sm absolute top-0 dark:bg-red-900 dark:text-red-300 border border-red-400">
                  sale
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
