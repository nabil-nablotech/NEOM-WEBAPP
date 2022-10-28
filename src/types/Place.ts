import { VisitAssociate } from "./Event";
import { Media } from "./Media";

export type PlaceApi = {
  id: string;
  latitude: number;
  longitude: number;
  thumbnailUrl?: string;
  placeNameEnglish: string;
  placeNameArabic: string;
  siteDescription: string;
  siteType: string[];
  updatedAt: string;
  keywords: string[] | null;
  placeNumber: string | null;
  uniqueId: string;
  period: string[];
  researchValue: string[];
  tourismValue: string[];
  stateOfConservation: string[];
  recommendation: string[];
  risk: string[];
  placeUIPath: string;
  // media_associates: MediaAssociates;
  media_associates: MediaAssociates2;
  visit_associates: VisitAssociate[]
  libraryItems: Media[]
};
export type Place = {
  id: string;
  latitude: number;
  longitude: number;
  attributes: PlaceApiResponse;
};

export type PlaceApiResponse2 = PlaceApiResponse & {
  media_associates: MediaAssociates2;
}

export type PlaceApiResponse = {
  thumbnailUrl?: string;
  placeNameEnglish: string;
  placeNameArabic: string;
  siteDescription: string;
  updatedAt: string;
  keywords: string[] | null;
  placeNumber: string | null;
  latitude: Number;
  longitude: Number;
  uniqueId: string;
  period: string[];
  researchValue: string[];
  tourismValue: string[];
  stateOfConservation: string[];
  recommendation: string[];
  risk: string[];
  media_associates: MediaAssociates;
  siteType: string[]
  placeUIPath: string
}

export type MediaAssociates = {
  data: {
    attributes: {
      media_unique_id: {
        data: {
          attributes: {
            object: {
              data: {
                attributes: {
                  url: string;
                };
              };
            };
          };
        };
      };
    };
  }[];
};

export type ImageFormat = {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  path: string | null
  size: number
  url: string
  width: number
}

export type MediaAssociates2_MediaObject_Format = {
  large: ImageFormat
  medium: ImageFormat
  small: ImageFormat
  thumbnail: ImageFormat
}

export type MediaAssociates2_MediaObject = {
  alternativeText: string
  caption: string
  createdAt: string
  ext: string
  folderPath: string
  formats: MediaAssociates2_MediaObject_Format
  hash: string
  height: number
  id: number
  mime: string
  name: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  size: number
  updatedAt: string
  url: string
  width: number
}

export type MediaAssociateObj = {
  createdAt: string
  id: number
  media_unique_id: {
    actionType: string
    bearing: string | null
    by: string | null
    citation: string | null
    createdAt: string
    deleted: string | null
    description: string
    featuredImage: string | null
    fileName: string
    id: number
    keywords: string | null
    latitude: string | null
    longitude: string | null
    mediaUIPath: string | null
    object: MediaAssociates2_MediaObject
    objectURL: string | null
    photographedBy: string | null
    referenceURL: string | null
    title: string
    uniqueId: string
    updatedAt: string
  }
}

export type MediaAssociates2 = Array<MediaAssociateObj>

export type Meta = {
  pagination: {
    total: number;
    pageCount: number;
    pageSize: number;
    page: number;
  };
};

export type Languages = {
  data: {
    attributes: {
      name: string;
    };
  };
};
export type Locale = {
  value: string;
  languages: Languages;
};
export type Translation = {
  data: {
    id: string;
    attributes: {
      code: string;
      locale: Locale[];
    };
  };
};
export type FieldOption = {
  id: string;
  attributes: {
    name: string;
    translation: Translation;
  };
};
export type FieldOptions = {
  data: FieldOption[] | [];
};
