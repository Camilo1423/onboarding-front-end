import React from "react";
import { Input as NextInput } from "@nextui-org/react";
import { cn } from "@Utils";
import { ThemeBasic } from "@Theme";

const InputStandar = React.forwardRef((props, ref) => {
  return (
    <NextInput
      ref={ref}
      labelPlacement="outside"
      classNames={{
        input: ["font-light"],
        label: cn("font-light", `!${ThemeBasic.text}`),
        inputWrapper: cn(
          "!bg-transparent border border-gray-300 !transition-all !hover:bg-transparent !focus:bg-transparent rounded-md !outline-none !focus:outline-none",
          ThemeBasic.focusWithinBorder,
          ThemeBasic.hoverBorder,
          ThemeBasic.focusBorder
        ),
      }}
      {...props}
    />
  );
});

InputStandar.displayName = "Input";

export default InputStandar;
