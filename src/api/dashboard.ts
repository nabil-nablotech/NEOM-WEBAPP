
import { DashboardResponse } from "../types/dashboard";
import client from "../utils/services/axiosClient";

export const fetchSearchCount = (): Promise<DashboardResponse> =>
  client.get(`/api/search`).then((response) => response.data);

