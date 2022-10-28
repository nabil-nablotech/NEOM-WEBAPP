
import {Place, PlaceApi} from '../types/Place';
import client from "../utils/services/axiosClient";

export const placeDetails = (payload: string): Promise<PlaceApi> =>
  client.get(`/api/custom/place/${payload}`).then((response) => response.data);

