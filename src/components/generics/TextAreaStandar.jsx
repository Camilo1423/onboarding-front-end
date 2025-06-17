import React from "react";
import { Textarea as NextTextarea } from "@nextui-org/react";
import { cn } from "@Utils";
import { ThemeBasic } from "@Theme";

const TextAreaStandar = React.forwardRef((props, ref) => {
  return (
    <NextTextarea
      ref={ref}
      labelPlacement="outside"
      classNames={{
        input: "font-light",
        label: cn("font-light", `!${ThemeBasic.text}`),
        base: "border-none",
        inputWrapper: cn(
          "!bg-transparent border border-gray-300 !transition-all !hover:bg-transparent !focus:bg-transparent rounded-md !outline-none",
          ThemeBasic.focusWithinBorder,
          ThemeBasic.hoverBorder,
          ThemeBasic.focusBorder
        ),
      }}
      {...props}
    />
  );
});

TextAreaStandar.displayName = "Textarea";

export default TextAreaStandar;
