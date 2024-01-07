"use client";
import { Restaurant } from "@/payload-types";
import { TQueryValidator } from "../../lib/validators/query-validator";
import { trpc } from "@/trpc/client";
import React, { useContext, useEffect } from "react";
import StateContext from "@/store/state-context";
import { Skeleton } from "../ui/skeleton";
import RestaurantsListing from "./RestaurantsListing";

interface RestaurantsProps {
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const Restaurants = (props: RestaurantsProps) => {
  const { query } = props;
  const contextValue = useContext(StateContext);

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }

  const { isRestaurants, setIsRestaurants } = contextValue;
  console.log(isRestaurants);

  const { data: restaurantsResults, isLoading } =
    trpc.getRestaurants.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const restaurants = restaurantsResults?.pages.flatMap(
    (page) => page.restaurants
  );

  let map: (Restaurant | null)[] = [];

  if (restaurants && restaurants.length) {
    map = restaurants;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  console.log(map);
  return (
    <div>
      {map.map((restaurant, i) => (
        // !restaurant || !isRestaurants ? (
        //   <div className="flex flex-col w-full" key={i}>
        //     <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        //       <Skeleton className="h-full w-full" />
        //     </div>
        //   </div>
        // ) : null
        <RestaurantsListing
          key={`restaurant-${i}`}
          restaurant={restaurant}
          isRestaurants={isRestaurants}
          setIsRestaurants={setIsRestaurants}
          index={i}
        />
      ))}
    </div>
  );
};

export default Restaurants;
