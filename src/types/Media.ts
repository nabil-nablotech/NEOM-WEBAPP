import { NullValueNode } from "graphql";
import { Place } from "./Place";

export type PlaceUnique = {
  place_unique_id: {
    data: Place | null;
  };
};

export type Media = {
  id: string;
  attributes: {
    thumbnailUrl?: string;
    title: string;
    description: string;
    referanceUrl: string;
    fileName: string;
    bearing: string;
    actionType: string;
    featuredImage: boolean;
    updatedAt: Date;
    keywords: string[] | null;
    citation: string;
    latitude: Number;
    longitude: Number;
    imageMetadata: {
      fileSize: Number;
    };
    uniqueId: string;
    object: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    media_associate: {
      data: {
      attributes: PlaceUnique;
    }
    }
  }
};
export type MediaApi = {
  id: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  referanceUrl: string;
  objectURL: string;
  fileName: string;
  bearing: string;
  actionType: string;
  featuredImage: boolean;
  updatedAt: Date;
  keywords: string[] | null;
  citation: string;
  latitude: Number;
  longitude: Number;
  imageMetadata: {
    fileSize: Number;
  };
  uniqueId: string;
  object: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  media_associate: {
    data: {
    attributes: PlaceUnique;
  }
  }
};
