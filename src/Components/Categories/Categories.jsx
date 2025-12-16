import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query"; // ✅ Correct import for v5
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Caregories.css";
const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(`${baseUrl}/categories`);
    return data.data; // ✅ Return only the array
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getCategories"], // ✅ Array form for keys
    queryFn: getCategories
  });

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <h3>Loading Categories...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-5 text-danger">
        <h3>Failed to load categories. Please try again later.</h3>
      </div>
    );
  }

  return (
    <>
   
   
    </>
  );
}