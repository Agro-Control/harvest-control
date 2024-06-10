"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-900/20 dark:bg-gray-50/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gray-900 transition-all dark:bg-gray-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

export const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      `relative h-14 w-14 overflow-hidden rounded-full bg-transparent flex justify-center items-center border border-white`,
      className
    )}
    {...props}
    style={{ background: `radial-gradient(closest-side, #f0f1f2 79%, transparent 80% 100%), conic-gradient(#4ade81 ${(value || 0)}%, white 0)` }}
  >
    <div className="bg-transparent text-sm font-bold">{`${(value || 0)}%`}</div>

  </ProgressPrimitive.Root>
))