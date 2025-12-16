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

  const toggleWishlist = (id) => {
    isProductInWishlist(id)
      ? removeFromWishlist(id)
      : addToWishlist(id);

    setAnimateId(id);
    setTimeout(() => setAnimateId(null), 400);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#08b623" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-10">
      {/* GRID RESPONSIVE */}
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        gap-4
      ">
        {data?.map((product) => {
          const productId = product?._id;
          const productTitle =
            product?.title?.split(" ", 2).join(" ");
          const inWishlist = isProductInWishlist(productId);

          return (
            <div key={productId} className="relative">
              <div className="product p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition">

                <Link
                  to={`/prodectdetails/${productId}/${product?.category?.name}`}
                >
                  <img
                    src={product?.imageCover}
                    alt={productTitle}
                    className="w-full h-40 object-contain"
                  />

                  <h3 className="text-green-500 text-sm mt-2">
                    {product?.category?.name}
                  </h3>

                  <h2 className="text-gray-700 text-sm font-medium">
                    {productTitle}
                  </h2>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">
                      {product?.priceAfterDiscount ? (
                        <>
                          <span className="line-through text-red-400 mr-1">
                            {product.price} EGP
                          </span>
                          <span>{product.priceAfterDiscount} EGP</span>
                        </>
                      ) : (
                        `${product.price} EGP`
                      )}
                    </span>

                    <span className="text-sm">
                      {product?.ratingsAverage}
                      <i className="fas fa-star text-yellow-400 ml-1"></i>
                    </span>
                  </div>
                </Link>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(productId)}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow
                    ${inWishlist ? "bg-pink-500 text-white" : "bg-gray-200"}
                    ${animateId === productId ? "animate-heart" : ""}
                  `}
                >
                  <Heart fill={inWishlist ? "currentColor" : "none"} />
                </button>

                {/* Add to cart */}
                <button
                  onClick={() => addproducttocart(productId)}
                  className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  + Add
                </button>

                {/* Sale badge */}
                {product?.priceAfterDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
