export const capitalizeFirstLowercaseRest = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const objectToArray = (object) =>
  Object.keys(object).map((key) => object[key]);
