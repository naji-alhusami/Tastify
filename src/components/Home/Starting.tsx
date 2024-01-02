"use client";
import React from "react";
import Image from "next/image";

import WidthWrapper from "../WidthWrapper";
import HomeImage from "../../../public/images/home-image.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Starting = () => {
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
          <div className=" w-full flex flex-col justify-center bg-white p-4 rounded-md gap-2 shadow-lg md:absolute md:top-48 md:flex-row md:max-w-2xl lg:top-80">
            <Input
              type="text"
              className="focus-visible:ring-red-500"
              placeholder="Locate Address"
            />
            <Button>Locate Me</Button>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Starting;
