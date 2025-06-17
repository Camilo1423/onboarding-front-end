export function flattenModules(modules) {
  const flatModules = [];

  function extractModules(modulesList) {
    modulesList.forEach((module) => {
      // Copiar el módulo actual sin sus child_modules
      const { child_modules, ...moduleWithoutChildren } = module;
      flatModules.push(moduleWithoutChildren);

      // Procesar los child_modules de forma recursiva
      if (Array.isArray(child_modules)) {
        extractModules(child_modules);
      }
    });
  }

  extractModules(modules.reverse());
  return flatModules;
}
