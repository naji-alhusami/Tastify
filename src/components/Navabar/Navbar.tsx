"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { pacifico } from "@/app/fonts";
import {
  CircleUserRound,
  ShoppingCart,
  XCircle,
  MailCheck,
} from "lucide-react";
import { Button } from "../ui/button";
import Signup from "../Auth/Signup";
import AuthModal from "../ui/AuthModal";
import ThanksModal from "../ui/ThanksModal";
import Login from "../Auth/Login";

const Navbar = () => {
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const [isThanksModal, setIsThanksModal] = useState<boolean>(false);
  const [isSignupForm, setIsSignupForm] = useState<boolean>(false);

  const openSignupModalHandler = () => {
    setIsSignupForm(true);
    setIsAuthModal(true);
  };

  const openLoginModalHandler = () => {
    setIsSignupForm(false);
    setIsAuthModal(true);
  };

  const closeModalHandler = () => {
    setIsAuthModal(false);
    setIsThanksModal(false);
  };

  return (
    <section className="bg-white sticky z-10 top-0 inset-x-0 h-16 shadow-lg">
      {/* signup and login Modal */}
      <AuthModal
        onClose={closeModalHandler}
        openModal={isAuthModal}
        header={
          <div className="flex flex-col pb-8">
            <XCircle
              onClick={closeModalHandler}
              className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full"
            />

            <h1 className="font-bold text-2xl">Welcome!</h1>
            <h1 className="text-md">
              {isSignupForm
                ? "Sign-up to continue"
                : "Login to continue"}
            </h1>
          </div>
        }
      >
        {isSignupForm ? (
          <Signup
            setIsThanksModal={setIsThanksModal}
            setIsAuthModal={setIsAuthModal}
            setIsSignupForm={setIsSignupForm}
          />
        ) : (
          <Login setIsSignupForm={setIsSignupForm} />
        )}
      </AuthModal>

      {/* Thanks Modal */}
      <ThanksModal
        onClose={closeModalHandler}
        openModal={isThanksModal}
        header={
          <div className="flex flex-col pb-8">
            <XCircle
              onClick={closeModalHandler}
              className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full"
            />
            {isSignupForm && (
              <>
                <MailCheck className="text-rose-500 h-12 w-12 self-center" />
                <h1 className="font-bold text-2xl">Welcome!</h1>
                <h1 className="text-md">
                  Thanks for signing-up, We have sent an email verification for
                  you.
                </h1>
              </>
            )}
          </div>
        }
      />

      <header className="h-full flex flex-row items-center justify-between mx-1 md:mx-8 lg:mx-16">
        <div className=" p-3 m-2 hover:bg-rose-100 hover:rounded-full hover:p-3 md:hidden">
          <CircleUserRound
            className="text-rose-500 h-6 w-6"
            onClick={openLoginModalHandler}
          />
        </div>
        <div className="ml-0 md:ml-4">
          <Link href="/">
            <h1 className={cn(" text-rose-500 text-4xl", pacifico.className)}>
              Tastify
            </h1>
          </Link>
        </div>

        <div className="md:flex md:flex-row">
          <div className="hidden md:flex md:flex-row md:justify-center md:items-center">
            <Button
              className="mr-2"
              variant="ring"
              onClick={openLoginModalHandler}
            >
              Log in
            </Button>
            <Button className="mr-8" onClick={openSignupModalHandler}>
              Sign up
            </Button>
          </div>
          <div className="m-1 p-3 hover:bg-rose-100 hover:rounded-full hover:p-3 ">
            <ShoppingCart className="text-rose-500 h-6 w-6" />
          </div>
        </div>
      </header>
      {/* <div className="hidden lg:flex flex-row items-center justify-center w-full"> */}
      {/* <NavMenuItems /> */}
      {/* <div className=" border-rounded-full flex flex-row ">
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-100 mr-1 border-rose-300"
            placeholder="Search For Restaurant..."
          /> */}
      {/* <Search className="absolute right-0 top-2 text-gray-500" /> */}
      {/* <Button variant={"outline"}>Search</Button>
        </div>
      </div> */}
    </section>
    // <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 ">
    //   <header className="relative bg-white">
    //     <WidthWrapper>
    //       <div className="border-b border-gray-200 ">
    //         <div className="flex h-16 items-center">
    //           <div className="flex lg:ml-0">
    //             <Link href="/">
    //               <h1
    //                 className={cn(
    //                   " text-rose-500 text-4xl",
    //                   pacifico.className
    //                 )}
    //               >
    //                 Tastify
    //               </h1>
    //             </Link>
    //           </div>
    //           <div className=" z-50 lg:ml-8 lg:block lg:self-stretch">
    //             <NavMenuItems />
    //           </div>
    //         </div>
    //       </div>
    //     </WidthWrapper>
    //   </header>
    // </div>
  );
};

export default Navbar;
