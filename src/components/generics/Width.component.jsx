import React from "react";
import PropTypes from "prop-types";

const WidthLayout = ({ children }) => {
  return <div className="w-full max-w-7xl mx-auto">{children}</div>;
};

WidthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WidthLayout;
