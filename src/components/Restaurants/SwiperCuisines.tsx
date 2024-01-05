"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ITEMS_CATEGORIES } from "@/ItemsCategories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const SwiperCuisines = () => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-rose-500 border-rose-500";

  return (
    <div className="relative  h-32 overflow-hidden rounded-xl ">
      <div className="absolute inset-0  opacity-100 transition ">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-3 transition")}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-white" />{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-3 transition")}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-white" />{" "}
        </button>
      </div>

      <Swiper
        // pagination={{
        //   renderBullet: (_, className) => {
        //     return `<span class="rounded-full transition ${className}"></span>`;
        //   },
        // }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        loop={true}
        modules={[Pagination]}
        className="h-full w-full flex justify-center items-center"
        breakpoints={{
          375: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1110: {
            slidesPerView: 5,
          },
        }}
      >
        {ITEMS_CATEGORIES.map((item, i) => (
          <SwiperSlide
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            key={i}
            className="relative h-full mx-auto"
          >
            <Link href="/">
              <Image
                src={item.icon}
                alt={item.value}
                width={100}
                height={100}
                className="-z-10 h-16 w-16 object-cover object-center"
              />
              <p>{item.label}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCuisines;
