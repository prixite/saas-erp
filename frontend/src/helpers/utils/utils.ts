import { toast } from "react-toastify";
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
export const nicRegex = /^\d+\.?\d*$/;
/* eslint-enable */

function iterateDeepObj(obj: unknown) {
  if (typeof obj === "string") {
    return obj;
  }
  if (obj[Object.keys(obj)[0]]) {
    return iterateDeepObj(obj[Object.keys(obj)[0]]);
  }
  return obj;
}
export const truncateString = (str: string, n: number) => {
  if (str.length > 10) {
    return str.substring(0, n) + "...";
  } else {
    return str;
  }
};
export const toastAPIError = (
  message: string,
  status?: number,
  data?: unknown
) => {
  switch (status) {
    case 400: {
      const errorToPrint = iterateDeepObj(data);
      if (errorToPrint) {
        toast.error(errorToPrint, {
          autoClose: 3000,
          pauseOnHover: false,
        });
      } else {
        toast.error(
          `${status} The server was unable to understand the request`,
          {
            autoClose: 3000,
            pauseOnHover: false,
          }
        );
      }
      break;
    }

    case 401: {
      toast.error(`${status} Unauthorized Request`, {
        autoClose: 3000,
        pauseOnHover: false,
      });
      break;
    }

    case 403: {
      toast.error(
        `Forbidden Request: Execution of access to this resource is forbidden.`,
        {
          autoClose: 3000,
          pauseOnHover: false,
        }
      );
      break;
    }

    case 404: {
      toast.error(`${status} Requested resoure not found`, {
        autoClose: 3000,
        pauseOnHover: false,
      });
      break;
    }

    default: {
      toast.error(message, {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }
  }
};
