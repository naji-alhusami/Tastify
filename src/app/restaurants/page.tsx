import React from "react";

import SwiperCuisines from "@/components/Restaurants/SwiperCuisines";
import RestaurantsListing from "@/components/Restaurants/RestaurantsListing";

const RestaurantsPage = () => {
  return (
    <div className="mx-4 mt-4">
      <div>
        <h1 className="text-4xl">Choose Cuisines:</h1>
      </div>
      <div className="flex justify-center items-center m-4">
        <SwiperCuisines />
      </div>
      <div>
        <RestaurantsListing query={{ sort: "desc", limit: 4 }} />
      </div>
    </div>
  );
};

export default RestaurantsPage;
