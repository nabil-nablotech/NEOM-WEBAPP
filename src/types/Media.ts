import { Place } from "./Place";
import { InventoryAssociationType_Event, InventoryAssociationType } from "./SearchResultsTabsProps";

export type PlaceUnique = {
  place_unique_ids: {
    data: Place[] | null;
  };
};

type MediaTypeObject = {
  attributes : {
    typeCode: string
  }
}

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
    media_type: {
      data: MediaTypeObject[]
    }
  }
};
export type MediaApi = {
  categoryType: string[] | []
  Author: string
  id: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  referenceURL: string;
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
    url: string;
    name: string
    size: number
    createdAt: string
    updatedAt: string
    ext: string
    width: number
    height: number
  };
  media_associate: {
    visit_unique_ids: InventoryAssociationType_Event[],
    place_unique_ids: InventoryAssociationType[],
    data: {
    attributes: PlaceUnique;
  }
  }
  media_type: typeCodeArrObj[]

};

export type MediaApi2 = {
  id: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  referenceURL: string;
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
    url: string;
    name: string
    size: number
    createdAt: string
    updatedAt: string
    ext: string
  };
  media_associate: {
    visit_unique_ids: InventoryAssociationType_Event[],
    place_unique_ids: InventoryAssociationType[],
    data: {
    attributes: PlaceUnique;
  }
  }
  media_type: typeCodeArrObj[]

};

export type typeCodeArrObj = {
  typeCode: string
} 
