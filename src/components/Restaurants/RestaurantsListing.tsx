"use client";
import React, { useEffect } from "react";
import { Restaurant } from "../../payload-types";
import { Skeleton } from "../ui/skeleton";

interface RestaurantsListingProps {
  isRestaurants: boolean;
  setIsRestaurants: (restaurant: boolean) => void;
  restaurant: Restaurant | null;
  index: number;
}

const RestaurantsListing = ({
  restaurant,
//   index,
  isRestaurants,
//   setIsRestaurants,
}: RestaurantsListingProps) => {
    
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsRestaurants(true);
//     }, index * 75);

//     return () => clearTimeout(timer);
//   }, [index, setIsRestaurants]);

  if (!restaurant || !isRestaurants)
    return (
      <div className="flex flex-col w-full">
        <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );

  return (
    <div>
      <h1>naji</h1>
    </div>
  );
};

export default RestaurantsListing;
