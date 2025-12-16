import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import "./brands.css";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export default function Brands() {
  function getBrands() {
    return axios.get(`${baseUrl}/brands`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading brands...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        Error fetching brands
      </div>
    );

  return (
    <>
      <Helmet>
        <title>FreshCart - Brands</title>
        <meta
          name="keywords"
          content="FreshCart, Ecommerce, Brands, Products"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-24">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          All Brands
        </h2>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data?.data?.data.map((item) => (
            <Link
              key={item._id}
              to={`/products/brand/${item.name}/${item._id}`}
              aria-label={`View products from ${item.name}`}
              className="group"
            >
              <div className="border rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-contain mb-3"
                  loading="lazy"
                />
                <h5 className="text-center font-medium text-gray-700 group-hover:text-green-600">
                  {item.name}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
