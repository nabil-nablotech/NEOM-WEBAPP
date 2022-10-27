
import {Place} from '../types/Place';
import client from "../utils/services/axiosClient";

export const placeDetails = (payload: string): Promise<Place> =>
  client.get(`/api/custom/place/${payload}`).then((response) => response.data);

