import dayjs from 'dayjs';
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

