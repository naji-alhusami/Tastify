"use client";
import React, { useEffect } from "react";
import { Restaurant } from "../../payload-types";
import { Skeleton } from "../ui/skeleton";
import { ITEMS_CATEGORIES } from "@/ItemsCategories";

interface RestaurantsListingProps {
  restaurant: Restaurant | null;
}

const RestaurantsListing = ({ restaurant }: RestaurantsListingProps) => {
  if (!restaurant) {
    return (
      <div className="flex flex-col w-full">
        <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
        <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
      </div>
    );
  }

  if (restaurant)
    return (
      <div>
        <h1>Restaurants</h1>
      </div>
    );
};

export default RestaurantsListing;
