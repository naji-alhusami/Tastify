"use client";
import React, { useEffect } from "react";
import { Restaurant, Media } from "../../payload-types";
import { Skeleton } from "../ui/skeleton";
import { ITEMS_CATEGORIES } from "@/ItemsCategories";
import Image from "next/image";
import { Bike } from "lucide-react";

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
  if (restaurant) console.log("restaurant:", restaurant);
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg hover:bg-rose-100 overflow-hidden my-4 md:mx-4" >
      {restaurant.restaurantImage.map((restImg) => (
        <div key={restImg.id}>
          {typeof restImg.image === "string" ? (
            <Image
              src={restImg.image}
              alt="rest-image"
              width={200}
              height={100}
            />
          ) : (
            <div className="w-[300px] h-[200px] transition-transform transform-gpu hover:scale-100">
              <Image
                src={restImg.image.url || ""}
                alt="rest-image"
                // width={400}
                // height={350}
                fill
                className="w-full transition-transform transform-gpu hover:scale-105"
              />
            </div>
          )}
        </div>
      ))}
      <div className="p-4 ">
        <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        <p>{restaurant.category}</p>
        <div className="flex flex-row text-rose-500">
          <Bike color="#db0042" strokeWidth={1} />
          <p className="#db0042">Free</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsListing;
