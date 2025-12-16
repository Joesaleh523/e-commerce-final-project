import { useContext, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { Cartcontext } from "../Cartcontext/CartContext";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const {
    cartdetails,
    removecartitem,
    loading,
    getcart,
    Clearcart,
    updatecartitem,
  } = useContext(Cartcontext);

  useEffect(() => {
    getcart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#08b623" />
      </div>
    );
  }

  if (cartdetails?.numOfCartItems === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold text-3xl text-green-500">
          Your Cart is empty!
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartdetails?.data.products.map((product) => (
              <tr key={product.product._id} className="border-b">
                <td className="p-3">
                  <img
                    src={product.product.imageCover}
                    className="w-20"
                    alt={product.product.title}
                  />
                </td>
                <td className="p-3 font-medium">
                  {product.product.title}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updatecartitem(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() =>
                        updatecartitem(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3 font-semibold">
                  {product.price} EGP
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      removecartitem(product.product._id)
                    }
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={Clearcart}
          className="w-full sm:w-1/3 text-white bg-green-500 py-2 rounded-lg"
        >
          Clear Cart
        </button>

        <NavLink to="/checkout" className="w-full sm:w-1/3">
          <button className="w-full text-white bg-green-600 py-2 rounded-lg">
            Check out
          </button>
        </NavLink>
      </div>
    </div>
  );
}
