import dayjs from "dayjs";
import styled from "styled-components";
import { StyledAntTable } from "../../components/StyledAntTable";
import { MediaAssociates2, PlaceApi } from "../../types/Place";
import { tabNameProps } from "../../types/SearchResultsTabsProps";
import * as Yup from 'yup';

export const baseUrl = `http://localhost:9999`;
// export const baseUrl = `https://8568-117-251-210-47.ngrok.io`;
export const webUrl = `http://localhost:3000`;
export const limit = 10;

export const formatWebDate = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format("ddd, DD MMM, hh:mm A");
  }
  return "";
};
export const formatDate = (value: string) => {
  if (Date.parse(value)) {
    return dayjs(value).format("MM/DD/YY");
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
    default: 
      return PLACES_TAB_NAME
  }
};

export const addItemDefaultSteps = ['Item Details', 'Keywords']

export const addItemMediaSteps = ['Media', 'Item Details', 'Associations', 'Keywords']

export const StyledTableWrapper = styled(StyledAntTable)`
  .ant-table-container {
  }
  .ant-table {
    margin-block: 2em;
  }

  .ant-table-thead > tr > th:not(.ant-table-thead > tr > th.more-menu-ant-cell),
  .ant-table-tbody
    > tr
    > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
    min-width: 50px;
  }

  th.ant-table-cell {
    white-space: break-spaces;
  }
  .ant-table-cell.more-menu-ant-cell {
    vertical-align: middle;
    min-width: 20px;
    width: 20px;
  }
  .more-menu-div {
    vertical-align: middle;
  }
  .ant-table-thead > tr > th.ant-table-cell-fix-right,
  .ant-table-cell-fix-right {
    background: var(--off-white-background-color);
  }

  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > thead
    > tr
    > th.more-menu-ant-cell.ant-table-cell-fix-right {
    border-left: 1px solid #f0f0f0;
  }

  .ant-table-cell.cell-image {
    width: 15vw;
  }
  .media-table-image {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 3/2;
  }
  .ant-table-cell {
    vertical-align: middle;
  }

  @media (min-width: 575px) and (max-width: 1025px) {
    .ant-table-thead
      > tr
      > th:not(.ant-table-thead > tr > th.more-menu-ant-cell),
    .ant-table-tbody
      > tr
      > td:not(.ant-table-tbody > tr > td.more-menu-ant-cell) {
      min-width: 90px;
    }

    .ant-table-thead > tr > th.more-menu-ant-cell.ant-table-cell-fix-right,
    .ant-table-tbody > tr > td.more-menu-ant-cell.ant-table-cell-fix-right {
      right: -5vw !important;
    }

    th.ant-table-cell,
    th.ant-table-cell * {
    }
    td.ant-table-cell {
    }

    .cell-image {
      min-width: 20ch !important;
    }

    .cell-description {
      min-width: 20ch !important;
    }
  }
${antTablePaginationCss}
`;

export const commonSelectSxStyles = {
  textAlign: 'left',
  '& .MuiSelect-select': {
      padding: '0.5em 1em',
      color: 'var(--grey-text)'
  }
}
export const textInputSxStyles = {

  '& .MuiInputBase-input.MuiOutlinedInput-input': {
      border: 'none'
  },
  '& .MuiFormLabel-root.MuiInputLabel-root ': {
  },
  '& .MuiInputBase-input.MuiOutlinedInput-input ': {
      lineHeight: '1.2',
      border: '1.4px solid #fff',
      padding: '0.5em 1em',
      height: '1.4em',
  },
  '& .MuiOutlinedInput-notchedOutline span': {
      opacity: 1
  },
  '& .MuiOutlinedInput-notchedOutline legend': {
      color: 'transparent'
  }

}
export const commonFormControlSxStyles = {
  width: '100%',
  flexGrow: 0,
  '& .MuiInputBase-root': {
      backgroundColor: '#fff',
  }
}
export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const getQueryObj = (search: string) => {
  const searchParams = decodeURIComponent(search).replace('?', '');
  if (Boolean(searchParams)) {
    return JSON.parse(searchParams);
  }
  return null
}

export const computeArrayFromDelimiter = (wholeString: string, delimiter: string) => {
  return wholeString.split(delimiter)
}

export const shallRenderMedia = (mediaNo: number, mediaArray: MediaAssociates2) => {
  if(!mediaArray) return false

  if(mediaArray.length === mediaNo) {
    return true
  } else return false
}

function randomString(len: number) {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'').toUpperCase();
}

export const generateUniqueId = () => {
  return `${randomString(8)}-${randomString(4)}-${randomString(4)}-${randomString(4)}-${randomString(12)}`
}

export const AddPlaceFormSchema = Yup.object().shape({
  placeNumber: Yup.string()
    .required()
});

export const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, callback?: () => void) => {

  if(e.key === "Enter") {
    e.preventDefault()

    if(callback) callback()
  }
}

type isEmptyType = (value: any) => boolean


export const isEmptyValue: isEmptyType = (value: any) => {
  if (typeof value === 'string') return value === ''
  if (
    (typeof value === 'object') &&
    (Array.isArray(value)) &&
    value.length === 0
  ) return value.length === 0
  if (
    (typeof value === 'object') &&
    (Array.isArray(value)) &&
    value.length === 1
  ) return isEmptyValue(value[0])

  return false
}

export const NO_TEXT = "No data available"
export const NO_MEDIA = "No media items to display"
export const NO_TABLE_ROWS = "No items to display"
export const NO_LOCATION = "No location available"
export const NO_DESCRIPTION = "No description available"

export const checkIsNew = (updatedDate: string) => {
  const expDate = dayjs(updatedDate).add(30, "d").toDate();
  return dayjs().isBefore(expDate);
}


