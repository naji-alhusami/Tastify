import React from "react";

import SwiperCuisines from "@/components/Restaurants/SwiperCuisines";
import Restaurants from "@/components/Restaurants/Restaurants";

interface Params {
  searchParams: {
    lat: string;
    lon: string;
  };
}

const RestaurantsPage = ({ searchParams }: Params) => {
  return (
    <div className="mx-4 mt-4">
      <div>
        <h1 className="text-4xl">Choose Cuisines:</h1>
      </div>
      <div className="flex justify-center items-center m-4">
        <SwiperCuisines searchParams={searchParams} />
      </div>
      <div>
        <Restaurants query={{ sort: "desc", limit: 4 }} />
      </div>
    </div>
  );
};
export const dynamic = "force-dynamic"; // for prod mode
export default RestaurantsPage;
