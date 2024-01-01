"use client";
import React, { useState } from "react";
import Image from "next/image";

import WidthWrapper from "../WidthWrapper";
import HomeImage from "../../../public/images/home-image.png";
import AuthModal from "../ui/AuthModal";
import { MailCheck, XCircle } from "lucide-react";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ThanksModal from "../ui/ThanksModal";

const Starting = () => {
  return (
    <div>
      <div>
        <Image src={HomeImage} alt="home-image" className="w-full h-full" />
      </div>
      <WidthWrapper>
        <div className="absolute top-12 text-white pr-56 sm:pr-80 sm:top-20 md:pr-[30rem] md:top-36 lg:pr-[35rem] lg:top-52">
          <p className="font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">
            Everything You Need Is Brought To Your Door With Our Delivery
            Service
          </p>
        </div>
      </WidthWrapper>
    </div>
  );
};

export default Starting;
