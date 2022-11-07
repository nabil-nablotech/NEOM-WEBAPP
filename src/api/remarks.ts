import client from "../utils/services/axiosClient";
import { RemarksPayload } from "../types/Remarks";

export const getRemarks = (payload: any): Promise<any> =>
  client.get(`/api/custom/remarks`).then((response) => response.data);

export const addRemarks = (payload: RemarksPayload): Promise<any> =>
  client.post(`/api/custom/remarks`, JSON.stringify(payload)).then((response) => response.data);


