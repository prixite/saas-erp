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
export const nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
export const phoneRegex =
  /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
export const onlyIntegerRegex = /^\d+\.?\d*$/;
export const nicRegex = /^[1-4]{1}[0-9]{4}(-)?[0-9]{7}(-)?[0-9]{1}$/;
/* eslint-enable */
