export function collectFunctionalities(modules) {
    const functionalities = [];
  
    function extractFunctionalities(modulesList) {
      modulesList.forEach((module) => {
        if (Array.isArray(module.functionalities)) {
          functionalities.push(...module.functionalities);
        }
        if (Array.isArray(module.child_modules)) {
          extractFunctionalities(module.child_modules);
        }
      });
    }
  
    extractFunctionalities(modules);
    return functionalities;
  }