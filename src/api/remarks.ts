import client from "../utils/services/axiosClient";
import { RemarksPayload,Remark } from "../types/Remarks";

export const getRemarks = (payload: string): Promise<Remark[]> =>
  client.get(`/api/custom/remarks?uniqueId=${payload}`).then((response) => response.data);

export const addRemarks = (payload: RemarksPayload): Promise<Remark[]> =>
  client.post(`/api/custom/remarks`, JSON.stringify(payload)).then((response) => response.data);


