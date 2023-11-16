import { CONST } from "../../constant";

export const emailValidator = (value) => {
  // if (CONST.REGEX.EMAIL.test(value)) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const phoneNumberValidator = (value) => {
  if (
    CONST.REGEX.PHONENUMBER.test(value) ||
    (typeof value === "string" && value.length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

export const firstNameValidator = (value) => {
  if (
    value &&
    value.length > 2 &&
    CONST.REGEX.ALL_ALBHABET.test(value.trim())
  ) {
    return true;
  } else {
    return false;
  }
};

export const textAreaValidator = (value) => {
  if (value && value.length > 2) {
    return true;
  } else {
    return false;
  }
};

export const lastNameValidator = (value) => {
  if (value && CONST.REGEX.ALL_ALBHABET.test(value.trim())) {
    return true;
  } else {
    return false;
  }
};

export const dropDownValidator = (value) => {
  if (value && value.length !== 0) {
    return true;
  } else {
    return false;
  }
};

export const priceValidator = (value) => {
  if (value && value.length !== 0 && /^[0-9]+(\.[0-9]{1,2})?$/.test(value)) {
    return true;
  } else {
    return false;
  }
};
