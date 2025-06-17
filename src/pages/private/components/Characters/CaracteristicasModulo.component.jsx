import { Check } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@Utils";
import { ThemeBasic } from "@Theme";

const CaracteristicasModulo = ({ caracteristicas, title }) => {
  const [expanded, setExpanded] = useState(false);

  // Manejador para alternar "Ver más"/"Ver menos"
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Límite de elementos a mostrar inicialmente
  const limit = 2;
  const isExpandable = caracteristicas.length > limit;
  const itemsToShow = expanded
    ? caracteristicas
    : caracteristicas.slice(0, limit);

  return (
    <div className="border border-gray-300 rounded-lg p-6 w-full mt-3">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <ul className="space-y-4">
        <AnimatePresence>
          {itemsToShow.map((caracteristica, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Check className={cn(ThemeBasic.title, "w-5 h-5 mr-3")} />
              <div>
                <h3 className="font-medium text-gray-800">
                  {caracteristica.titulo}
                </h3>
                <p className="text-sm text-gray-600">
                  {caracteristica.descripcion}
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="w-full flex items-center justify-end">
        {isExpandable && (
          <button
            onClick={toggleExpand}
            className={cn(
              "mt-4 font-medium focus:outline-none hover:underline",
              ThemeBasic.text
            )}
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>
    </div>
  );
};

CaracteristicasModulo.propTypes = {
  caracteristicas: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CaracteristicasModulo;
