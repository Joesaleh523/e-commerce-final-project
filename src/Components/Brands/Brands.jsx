import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from '@tanstack/react-query';
import "./brands.css";

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export default function Brands() {
  function getBrands() {
    return axios.get(`${baseUrl}/brands`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  if (isLoading) return <p className="text-center">Loading brands...</p>;
  if (error) return <p className="text-danger">Error fetching brands</p>;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Brands</title>
        <meta name="keywords" content="FreshCart, Ecommerce, Brands, Products" />
      </Helmet>

      <div className="brands container my-5 py-5">
        <h2 className="h3 mt-3">All Brands</h2>
        <div className="row g-4">
          {data?.data?.data.map((item) => (
            <div key={item._id} className=" col-sm-4 col-md-4">
              <Link to={`/products/brand/${item.name}/${item._id}`} aria-label={`View products from ${item.name}`}>
                <div className="brand cursor-pointer rounded-3 p-2 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full"
                    loading="lazy"
                  />
                  <h5 className="fw-bold text-color my-3 text-center">{item.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}