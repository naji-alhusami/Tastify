import React from "react";

import SwiperCuisines from "@/components/Restaurants/SwiperCuisines";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RestaurantsPage = () => {
  return (
    <div className="mx-4 mt-4">
      <div>
        <h1 className="text-4xl">Cuisines</h1>
      </div>
      <div className="flex justify-center items-center m-4">
        <SwiperCuisines />
      </div>
      
    </div>
  );
};

export default RestaurantsPage;
