import { Media } from "./Media";
import { MediaAssociateObj, MediaAssociates, Place, PlaceApiResponse } from "./Place";
export type VisitAssociate = {
  data: {
    id: number
    attributes: {
      place_unique_id: {data: Place}
    }
  }
}
export type VisitAssociate2 = {
  id: number
  createdAt: string
  place_unique_id: PlaceApiResponse
  updatedAt: string
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

  artifacts: string[]
  assessmentType: string[]
  assessmentTypeOther: null | string
  createdAt: string
  deleted: boolean
  fieldNarrative: string
  id: number
  keywords: null | string[]
  latitude: number
  libraryItems: Media[]
  longitude: number
  mediaGallery: Array<MediaAssociateObj>
  media_associates: Array<MediaAssociateObj>
  period: string[]
  recommendation: string[]
  recordingTeam: string
  researchValue: string[]
  risk: string[]
  siteDescription: string
  siteType: string[]
  stateOfConservation: string[]
  tourismValue: string[]
  uniqueId: string
  updatedAt: string
  visitDate: string
  visitNumber: number
  visitUIPath: string
  visit_associate: VisitAssociate2
};
