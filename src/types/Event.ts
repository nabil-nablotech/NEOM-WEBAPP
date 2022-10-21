import { MediaAssociates, Place } from "./Place";
export type VisitAssociate = {
  data: {
    id: number
    attributes: {
      placeUniqueId: {data: Place}
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
    visit_associate: VisitAssociate
  };
};
