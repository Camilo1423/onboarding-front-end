import { useToast } from "@Providers";
import { cn } from "@Utils";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertCircle,
  destructive: AlertCircle,
};

const backgrounds = {
  success: "bg-green-50",
  info: "bg-blue-50",
  warning: "bg-yellow-50",
  destructive: "bg-red-50",
};

const iconColors = {
  success: "text-green-500",
  info: "text-blue-500",
  warning: "text-yellow-500",
  destructive: "text-red-500",
};

const borderColors = {
  success: "border-green-200",
  info: "border-blue-200",
  warning: "border-yellow-200",
  destructive: "border-red-200",
};

export function Toast({
  id,
  type,
  title,
  content,
  onClose,
  isExpanded,
  persistent,
}) {
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const Icon = icons[type];
  const shouldTruncate = content.length > 60;
  const { pauseToast, resumeToast } = useToast();

  useEffect(() => {
    return () => {
      resumeToast(id);
    };
  }, [id, resumeToast]);

  return (
    <motion.div
      className={cn(
        "relative flex items-start gap-3 rounded-lg border p-4 shadow-lg w-full",
        backgrounds[type],
        borderColors[type],
        isExpanded ? "pointer-events-auto" : "pointer-events-none"
      )}
      layout
      onMouseEnter={() => pauseToast(id)}
      onMouseLeave={() => resumeToast(id)}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-10",
          backgrounds[type]
        )}
      />
      <Icon
        className={cn("h-5 w-5 mt-0.5 flex-shrink-0 z-10", iconColors[type])}
      />

      <div className="flex-1 min-w-0 z-10">
        <h3 className="font-semibold text-zinc-900 ">
          {title}
        </h3>
        <motion.div
          className="text-sm text-zinc-700 overflow-hidden"
          animate={{ height: isExpanded ? "auto" : "1.5em" }}
        >
          {isContentExpanded || !shouldTruncate
            ? content
            : content.slice(0, 60) + "..."}
          {shouldTruncate && isExpanded && (
            <button
              onClick={() => setIsContentExpanded(!isContentExpanded)}
              className="block text-sm font-medium text-zinc-900 hover:underline mt-1"
            >
              {isContentExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </motion.div>
      </div>
      {persistent && (
        <button
          onClick={onClose}
          className={cn(
            "text-zinc-500 hover:text-zinc-700 transition-colors flex-shrink-0 z-10",
            !isExpanded && "opacity-0"
          )}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["success", "info", "warning", "destructive"])
    .isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  persistent: PropTypes.bool.isRequired,
};
