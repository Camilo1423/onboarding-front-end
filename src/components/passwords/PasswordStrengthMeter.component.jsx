import { cn } from "@Utils";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const calculateStrength = (password) => {
  let strength = 0;

  // Políticas de seguridad genéricas
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
};

const getStrengthMessage = (strength) => {
  switch (strength) {
    case 0:
    case 1:
    case 2:
      return {
        message: "Contraseña débil",
        color: "bg-red-500",
        textColor: "text-red-500",
      };
    case 3:
    case 4:
      return {
        message: "Contraseña regular",
        color: "bg-orange-500",
        textColor: "text-orange-500",
      };
    case 5:
      return {
        message: "Contraseña segura",
        color: "bg-green-500",
        textColor: "text-green-500",
      };
    default:
      return { message: "", color: "", textColor: "" };
  }
};

const PasswordStrengthMeter = ({ password, margin = true }) => {
  const strength = calculateStrength(password);
  const { message, color, textColor } = getStrengthMessage(strength);

  return (
    <>
      {password.length > 0 ? (
        <div className={cn(margin ? "mt-4" : "")}>
          <motion.div
            className={`h-2 rounded-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${(strength / 5) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <div className={`mt-2 text-sm ${textColor}`}>
            {password.length === 0 ? "" : message}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string.isRequired,
  margin: PropTypes.bool,
};

export default PasswordStrengthMeter;
