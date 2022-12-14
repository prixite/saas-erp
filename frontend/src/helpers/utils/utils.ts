export const capitalizeFirstLowercaseRest = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const objectToArray = (object) =>
  Object.keys(object).map((key) => object[key]);

export const toPkrFormat = (enumber: number | undefined) => {
  const amount = enumber?.toString();
  let lastThree = amount?.substring(amount.length - 3);
  const otherNumbers = amount?.substring(0, amount.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  const result =
    "RS. " + otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return result;
};
/* eslint-disable */
export const emailRegX =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const nameRegex = /^[A-Za-z]*$/;
export const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* eslint-enable */
