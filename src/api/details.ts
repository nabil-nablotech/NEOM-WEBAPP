
import {PlaceApi} from '../types/Place';
import {EventApi} from '../types/Event';
import client from "../utils/services/axiosClient";

export const placeDetails = (payload: string): Promise<PlaceApi> =>
  client.get(`/api/custom/place/${payload}`).then((response) => response.data);

  
export const eventDetails = (payload: string): Promise<EventApi> =>
client.get(`/api/custom/event/${payload}`).then((response) => response.data);

