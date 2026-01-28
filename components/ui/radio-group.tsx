"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        `
        inline-flex items-center justify-center
        outline-none
        focus-visible:ring-[3px] focus-visible:ring-red-600
        disabled:cursor-not-allowed disabled:opacity-50

        [&>svg]:size-6
        [&>svg]:transition
        [&>svg]:text-gray-400
        data-[state=checked]:[&>svg]:text-red-600
        data-[state=checked]:[&>svg]:fill-red-600
        `,
        className,
      )}
      {...props}
    >
      <Heart />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
