import React from "react";
import VerifyEmail from "@/components/Auth/VerifyEmail";

interface VerifyEmailpageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailpage = ({ searchParams }: VerifyEmailpageProps) => {
  const token = searchParams.token;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" && (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailpage;
