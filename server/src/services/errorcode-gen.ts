// errorCodes.ts

const errorMappings = {
    source: {
      1: "APP",
      2: "DB",
      3: "USER",
      4: "SERVICE",
    },
    context: {
      0: "GENERIC",
      1: "USER",
      2: "CONFIG",
      3: "DEPENDENCY",
    },
    category: {
      1: "MAIL",
      2: "AUTH",
      3: "FILE",
      4: "VALIDATION",
    },
    subError: {
      0: "GENERIC",
      1: "TIMEOUT",
      2: "INVALID_RESPONSE",
    },
  };
  
  function generateErrorCodes(): Record<string, number> {
    const errorCodes: Record<string, number> = {};
  
    Object.entries(errorMappings.source).forEach(([sourceKey, sourceValue]) => {
      Object.entries(errorMappings.context).forEach(([contextKey, contextValue]) => {
        Object.entries(errorMappings.category).forEach(([categoryKey, categoryValue]) => {
          Object.entries(errorMappings.subError).forEach(([subErrorKey, subErrorValue]) => {
            const code = `${sourceKey}${contextKey}${categoryKey}${subErrorKey}`;
            const name = `${sourceValue}_${contextValue}_${categoryValue}_${subErrorValue}`.toUpperCase();
            errorCodes[name] = parseInt(code, 10);
          });
        });
      });
    });
  
    return errorCodes;
  }
  
  export const ERROR_CODES = generateErrorCodes();
