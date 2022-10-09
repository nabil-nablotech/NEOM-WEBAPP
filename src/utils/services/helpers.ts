import dayjs from 'dayjs';

export const baseUrl = `http://localhost:9999`;
// export const baseUrl = `https://d112-117-251-213-221.in.ngrok.io`;
const colors = [
  '#f4511e',
  '#bf360c',
  '#ef6c00',
  '#8d6e63',
  '#512da8',
  '#689f38',
  '#5c6bc0',
  '#ab47bc',
  'chocolate',
  'darkviolet',
];

export const formatWebDate = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format('ddd, DD MMM, hh:mm A');
  }
  return '';
};
export const formatDate = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format('MM/DD/YY hh:mm A');
  }
  return '';
};
export const formatDateTime = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format('MM/DD/YY hh:mm:ss A');
  }
  return '';
};
export const formatTime = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format('hh:mm A');
  }
  return '';
};

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const validateEmail = (s: string) => {
  const email_regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return email_regex.test(s)
} 

/**
 * Password must contain min 8 letter with at least a symbol, upper and lower case letters and a number
 * @param s 
 * @returns 
 */
export const validatePassword = (s: string) => {
  const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return password_regex.test(s)
} 

export function stringAvatar(name: string) {
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
}

