"use client";
import React, { useContext } from "react";
import Image from "next/image";

import WidthWrapper from "../WidthWrapper";
import HomeImage from "../../../public/images/home-image.jpg";
import { Button } from "../ui/button";
import AddressLocator from "@/components/Home/locate-address";
import StateContext from "@/store/state-context";
import { useRouter } from "next/navigation";

const Starting = () => {
  const contextValue = useContext(StateContext);
  const router = useRouter();

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }

  const { address, lat, lon } = contextValue;

  const findRestaurantsHandler = () => {
    router.push(`/restaurants?lon=${lon}&lat=${lat}`);
  };

  return (
    <div>
      <div>
        <Image
          src={HomeImage}
          alt="home-image"
          className="w-full h-full brightness-90"
        />
      </div>
      <WidthWrapper>
        <div className="flex flex-col justify-center items-center">
          <h1 className="mx-24 text-center absolute top-6 text-md font-bold tracking-tight text-gray-900 sm:mx-40 sm:text-3xl md:mx-52 md:top-16 lg:mx-72 lg:top-24 lg:text-5xl">
            Everything You Need Is Brought To Your Door With Our{" "}
            <span className="text-rose-500">Delivery Service</span>..
          </h1>
          <div className="relative w-full flex flex-col justify-center bg-white p-4 rounded-md gap-2 shadow-lg md:absolute md:top-48 md:flex-row md:max-w-2xl lg:top-80">
            <AddressLocator />
            {/* <Link
              
              href={`/restaurants?lon=${lon}&lat=${lat}`}
            >
              Find Food
            </Link> */}
            <Button
              onClick={findRestaurantsHandler}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Find Food
            </Button>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Starting;
