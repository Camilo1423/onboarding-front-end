import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@Utils";
import PropTypes from "prop-types";
import { ThemeBasic } from "@Theme";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-full",
        ThemeBasic.backgroundSecondaryOpacity
      )}
    >
      <SliderPrimitive.Range
        className={cn("absolute h-full", ThemeBasic.backgroundPrimary)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-4 w-4 rounded-full border bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        ThemeBasic.border
      )}
    />
  </SliderPrimitive.Root>
));

Slider.propTypes = {
  className: PropTypes.string,
};

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
