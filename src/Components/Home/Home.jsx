import React from "react";
import RecentProduct from "../RecentProducts/Recentproducts";
import Categoriesslider from "../Categoriesslider/Categoriesslider";
import Mainslider from "../Mainslider/Mainslider";

export default function Home() {
  return (
    <div className="pt-20 space-y-10">
      <Mainslider />
      <Categoriesslider />
      <RecentProduct />
    </div>
  );
}