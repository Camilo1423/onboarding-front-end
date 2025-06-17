import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "./toast";
import { useToast } from "@Providers";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [toasts]);

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col items-end gap-2 w-full max-w-sm"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <AnimatePresence mode="popLayout">
        {toasts
          .slice()
          .reverse()
          .map((toast, index) => (
            <motion.div
              key={`toast-${toast.id}`}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.85 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: isExpanded ? 1 : Math.max(1 - index * 0.05, 0.8),
                y: isExpanded ? 0 : index > 0 ? -index * 4 : 0,
              }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
              style={{
                transformOrigin: "top right",
                position: "relative",
                width: "100%",
                pointerEvents: isExpanded || index === 0 ? "auto" : "none",
                marginTop: isExpanded ? 0 : index === 0 ? 0 : "-70px",
                zIndex: toasts.length - index, // Asegura que la superposición sea correcta
              }}
              transition={{
                layout: { type: "spring", stiffness: 200, damping: 25 },
                scale: { type: "spring", stiffness: 200, damping: 20 },
              }}
            >
              <Toast
                {...toast}
                onClose={() => removeToast(toast.id)}
                isExpanded={isExpanded || index === 0}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
