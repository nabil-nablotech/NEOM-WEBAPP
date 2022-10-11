import dayjs from "dayjs";

export const baseUrl = `http://localhost:9999`;
// export const baseUrl = `https://b47a-59-94-73-204.in.ngrok.io`;
export const webUrl = `http://localhost:3000`

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
