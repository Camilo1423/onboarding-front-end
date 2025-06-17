import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import ButtonAnimation from "../../assets/animations/ButtonAnimationWhite.json";

const Button = ({
  children,
  startContent,
  endContent,
  isLoading = false,
  isDisabled = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "relative inline-flex items-center justify-center px-6 py-3 font-bold rounded-lg transition-all duration-300 ease-in-out outline-none shadow-md";

  const variantStyles = {
    primary: cn(
      `text-white`,
      ThemeBasic.focusRingPrimary,
      ThemeBasic.backgroundPrimary,
      ThemeBasic.hoverBackgroundPrimary
    ),
    secondary: cn(
      ThemeBasic.backgroundSecondary,
      ThemeBasic.hoverBackgroundSecondary,
      ThemeBasic.textWhite,
      ThemeBasic.focusRingSecondary
    ),
    white: cn(
      `bg-white`,
      `hover:bg-gray-100`,
      ThemeBasic.text,
      `focus:ring-white`
    ),
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={cn(
        baseStyle,
        variantStyles[variant],
        isDisabled || isLoading ? disabledStyle : "",
        className
      )}
      disabled={isDisabled || isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {isLoading ? (
          <div
            className="flex items-center justify-center overflow-hidden mr-2"
            style={{ height: "25px", width: "30px" }}
          >
            <Lottie
              animationData={ButtonAnimation}
              style={{
                marginTop: "12px",
                width: "400%",
                height: "400%",
                contentVisibility: "visible",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              loop={true}
            />
          </div>
        ) : startContent ? (
          <span className="mr-2">{startContent}</span>
        ) : null}
        {children}
        {endContent && !isLoading && <span className="ml-2">{endContent}</span>}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  startContent: PropTypes.node,
  endContent: PropTypes.node,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "white"]),
  className: PropTypes.string,
};

export default Button;
