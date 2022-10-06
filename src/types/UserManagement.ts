export type ColumnComponentTypes = {
    width: number,
    title: string,
    dataIndex: string,
    key: string,
    renderCell?: any
}

export type SingleObj = {
  key: React.Key | string,
  lastname: string,
  firstname: string,
  email: string,
  role: string,
  lastlogin: string,
  status: string
}

export type DataArray = Array<SingleObj>