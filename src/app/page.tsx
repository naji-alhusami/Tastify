import { cn } from "@/lib/utils";
import WidthWrapper from "@/components/WidthWrapper";
import Image from "next/image";
import HomeImage from "../../public/images/home-image.png";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative">
      {/* <div className=" border-rounded-full flex flex-row m-4 ">
        <input type="text" className="w-full p-2 " placeholder="Search For Restaurant..." />
        <Search className="absolute right-0 top-2 text-gray-500" />
        <Button>Search</Button>
      </div> */}
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
}
