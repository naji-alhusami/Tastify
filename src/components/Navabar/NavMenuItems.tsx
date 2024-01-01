"use client";
import { ITEMS_CATEGORIES } from "@/ItemsCategories";
import React, { useState } from "react";
// import NavMenuItem from "./NavMenuItem";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const NavMenuItems = () => {
  // const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [activeIndex, setActiveIndex] = useState<null | number>(null);

  // const isAnyOpen = activeIndex !== null;

  // const isOpen = index === activeIndex;

  const openCuisinesHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="relative flex items-center">
        <Button
          className={"gap-1.5"}
          onClick={openCuisinesHandler}
          variant={isOpen ? "secondary" : "ghost"}
        >
          Cuisines
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          {/* <div className="relative bg-white"> */}
          <div className="relative bg-white mx-auto max-w-7xl px-8 py-16">
            {/* <div className="mx-auto max-w-7xl px-8"> */}
              {/* <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16"> */}
                {/* <div className="col-span-4 col-start-1 grid grid-cols-5 gap-x-8"> */}
                  {ITEMS_CATEGORIES.map((item) => (
                    <>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        <div
                          onClick={() => close}
                          key={item.value}
                          className="group relative text-base sm:text-sm"
                        >
                          <div className="relative text-center aspect-video overflow-hidden rounded-lg  group-hover:opacity-75">
                            <Image
                              src={item.icon}
                              alt="product category image"
                              width={100}
                              height={100}
                              className="object-cover object-center"
                            />
                          </div>

                          {item.label}
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              </div>
            // </div>
          // </div>
        // </div>
      ) : null}
    </div>
  );
};

export default NavMenuItems;
