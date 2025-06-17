import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import PropTypes from "prop-types";

const LoadingComponent = ({ text }) => {
  return (
    <div className={cn("w-full flex items-center justify-center")}>
      <p className={cn("text-2xl font-normal px-2 py-1", ThemeBasic.text)}>
        {text}
      </p>
    </div>
  );
};

LoadingComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LoadingComponent;
