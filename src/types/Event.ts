import { MediaAssociates, Place } from "./Place";
export type VisitAssociate = {
  data: {
    id: number
    attributes: {
      place_unique_id: {data: Place}
    }
  }
}

export type Event = {
  id: string;
  attributes: {
    thumbnailUrl?: string;
    recordingTeam: string;
    visitNumber: string;
    siteDescription: string;
    updatedAt: string;
    createdAt: string;
    keywords: string[] | null;
    placeNumber: string | null;
    latitude: Number;
    longitude: Number;
    media_associates: MediaAssociates;
    visit_associate: VisitAssociate,
    uniqueId: string
  };
};
export type EventApi = {
  id: string;
  thumbnailUrl?: string;
  recordingTeam: string;
  visitNumber: string;
  siteDescription: string;
  updatedAt: string;
  createdAt: string;
  keywords: string[] | null;
  placeNumber: string | null;
  latitude: Number;
  longitude: Number;
  media_associates: MediaAssociates;
  visit_associate: VisitAssociate,
  uniqueId: string
};
