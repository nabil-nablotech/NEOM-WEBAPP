import dayjs from "dayjs";
import { tabNameProps } from "../../types/SearchResultsTabsProps";

export const baseUrl = `http://localhost:9999`;
// export const baseUrl = `https://7e68-117-197-248-242.in.ngrok.io`;
export const webUrl = `http://localhost:3000`;
export const limit = 5;

export const formatWebDate = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format("ddd, DD MMM, hh:mm A");
  }
  return "";
};
export const formatDate = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format("MM/DD/YY hh:mm A");
  }
  return "";
};
export const formatDateTime = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format("MM/DD/YY hh:mm:ss A");
  }
  return "";
};
export const formatTime = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format("hh:mm A");
  }
  return "";
};

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const validateEmail = (s: string) => {
  const email_regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return email_regex.test(s);
};

/**
 * Password must contain min 8 letter with at least a symbol, upper and lower case letters and a number
 * @param s
 * @returns
 */
export const validatePassword = (s: string) => {
  const password_regex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return password_regex.test(s);
};

export function stringAvatar(name: string) {
  return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
}

export function passwordGenerator() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

export function copyToClipboard(str: string) {
  navigator.clipboard.writeText(str);
};

export const staticValidationScheme = [
  {
    name: '8 characters',
    rule: /^.{8,}$/,
    fulfilled: false
  },
  {
    name: '1 uppercase letter',
    rule: /^(?=.*?[A-Z]).{1,}$/,
    fulfilled: false
  },
  {
    name: '1 special character',
    rule: /^(?=.*?[#?!@$%^&*-]).{1,}$/,
    fulfilled: false
  }
]

export const antTablePaginationCss = `
  .ant-pagination {
    font-family: 'Roboto-Regular';
  }

  .ant-pagination-item {
    border-color: var(--light-grey-border);
  }

  .ant-pagination-item a {
    color: var(--focused-black-text);

  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent;
  }
`

export const PLACES_TAB_NAME = 'Places'
export const EVENTS_TAB_NAME = 'Events'
export const LIBRARY_TAB_NAME = 'Library'
export const MEDIA_TAB_NAME = 'Media'

export const tabIndexBasedOnName = (tabName: tabNameProps) => {
  switch (tabName) {
    case PLACES_TAB_NAME:
      return 0;
    case EVENTS_TAB_NAME:
      return 1;
    case LIBRARY_TAB_NAME:
      return 2;
    case MEDIA_TAB_NAME:
      return 3;
  }
};

export const tabNameBasedOnIndex = (tabIndex: number) => {
  switch (tabIndex) {
    case 0:
      return PLACES_TAB_NAME;
    case 1:
      return EVENTS_TAB_NAME;
    case 2:
      return LIBRARY_TAB_NAME;
    case 3:
      return MEDIA_TAB_NAME;
  }
};
