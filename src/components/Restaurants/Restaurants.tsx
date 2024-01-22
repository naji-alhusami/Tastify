"use client";
import { Restaurant } from "@/payload-types";
import { TQueryValidator } from "../../lib/validators/query-validator";
import { trpc } from "@/trpc/client";
import React, { useContext } from "react";
import StateContext from "@/store/state-context";
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

  const { isRestaurant, showRestaurants } = contextValue;

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

  if (showRestaurants && restaurants && restaurants.length) {
    map = restaurants.filter((rest) => rest.category === isRestaurant);
  } else if (restaurants && restaurants.length) {
    map = restaurants;
  } else if (isLoading && !showRestaurants) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  console.log(map);
  console.log(isLoading);

  return (
    <div className="m-8 flex flex-col md:flex md:flex-row md:justify-center md:items-center">
      {map.map((restaurant, i) => (
        <RestaurantsListing key={`restaurant-${i}`} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default Restaurants;
