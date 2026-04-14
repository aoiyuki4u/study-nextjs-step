"use client";
import Lottie from "lottie-react";
import CredTickAnimation from "@/public/Cred-tick-animation.json";

export default function LottieBase() {
  return(
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-64 h-64">
        <Lottie 
          animationData={CredTickAnimation} 
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  )
}