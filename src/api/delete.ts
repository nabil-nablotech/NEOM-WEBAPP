import { dbIdTypes, deleteRecordPayload } from "../types/Place";
import client from "../utils/services/axiosClient";

export const deleteRecord = (payload: deleteRecordPayload, dbId: dbIdTypes, id: number): Promise<any> =>
    client.put(`/api/custom/delete/${dbId}/${id}`, payload).then((response) => response.data);
