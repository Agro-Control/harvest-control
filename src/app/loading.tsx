"use client";

import loading from "@/assets/loadingDots.json"
import Lottie from "lottie-react"

export default function Loading() {
    return (
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden text-green-950 ">
        <div className="flex w-[20vw] flex-col items-center justify-center  ">
        <Lottie
            animationData={loading}
            loop={true}
            style={{
                width: "200px",
                height: "200px",
            }}
        />
        </div>
        </div>
    )
  }