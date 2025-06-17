import { ThemeBasic } from "@Theme";
import PropTypes from "prop-types";

const LayoutForm = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl border-t-4 ${ThemeBasic.border}`}
      >
        <div className="relative px-8 pt-10 pb-8">{children}</div>
      </div>
    </div>
  );
};

LayoutForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutForm;
