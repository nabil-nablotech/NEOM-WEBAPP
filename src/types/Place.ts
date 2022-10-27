import { VisitAssociate } from "./Event";

export type PlaceApi = {
  id: string;
  latitude: number;
  longitude: number;
  thumbnailUrl?: string;
  placeNameEnglish: string;
  placeNameArabic: string;
  siteDescription: string;
  siteType: string;
  updatedAt: string;
  keywords: string[] | null;
  placeNumber: string | null;
  uniqueId: string;
  period: string;
  researchValue: string;
  tourismValue: string;
  stateOfConservation: string;
  recommendation: string;
  risk: string;
  placeUIPath: string;
  media_associates: MediaAssociates;
  visit_associates: VisitAssociate[]
};
export type Place = {
  id: string;
  latitude: number;
  longitude: number;
  attributes: {
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
    period: string;
    researchValue: string;
    tourismValue: string;
    stateOfConservation: string;
    recommendations: string;
    risk: string;
    media_associates: MediaAssociates;
  };
};

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
