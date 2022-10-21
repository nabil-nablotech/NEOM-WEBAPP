import { MediaAssociates } from "./Place";

export type Event = {
  id: string;
  attributes: {
    thumbnailUrl?: string;
    recordingTeam: string;
    visitNumber: string;
    siteDescription: string;
    updatedAt: string;
    keywords: string[] | null;
    placeNumber: string | null;
    latitude: Number;
    longitude: Number;
    media_associates: MediaAssociates;
  };
};
