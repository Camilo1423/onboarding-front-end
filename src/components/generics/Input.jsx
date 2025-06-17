import { useState } from "react";
import PropTypes from "prop-types";

const Input = ({
  label,
  value: propValue,
  onChange: propOnChange,
  onFocus: propOnFocus,
  onBlur: propOnBlur,
  startContent,
  endContent,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(propValue || "");

  const handleChange = (e) => {
    setValue(e.target.value);
    propOnChange?.(e);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    propOnFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    propOnBlur?.(e);
  };

  const labelClass = `absolute text-sm transition-all duration-300 pointer-events-none left-0 origin-left ${
    isFocused || value || startContent || props.placeholder
      ? "text-xs text-[#2b7fff] -translate-y-6"
      : "text-gray-500 translate-y-0"
  }`;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        {startContent && (
          <div className="absolute left-0 pl-3">{startContent}</div>
        )}
        <label htmlFor={props.id || props.name} className={labelClass}>
          {label}
        </label>
        <input
          {...props}
          className={`w-full bg-white/50 border-0 border-b-2 border-[#95A5A6]/30 rounded-none py-3 focus:border-[#2b7fff] focus:ring-0 transition-colors outline-none ${
            startContent ? "pl-10" : "px-0"
          } ${endContent ? "pr-10" : ""}`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {endContent && (
          <div className="absolute right-0 pr-3">{endContent}</div>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  startContent: PropTypes.node,
  endContent: PropTypes.node,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
