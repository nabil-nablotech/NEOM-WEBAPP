import React from "react";
import { DashboardResponse } from "./dashboard";
import { Place, Meta, FieldOptions } from "./Place";
import { Event, EventApi } from "./Event";
import { Media } from "./Media";

export type SearchResultTabsProps = {
  tabIndex?: number;
  handleSubmit?: () => void;
};

export type LabelProps = {
  img: string;
  label: string;
};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className: string;
}

export type tabNameProps = "Places" | "Events" | "Library" | "Media";

export type GridViewCard_Media = {
  itemIndex?: number;
  img?: string;
  title: string;
  subTitle: string;
  dateString: string;
  period?: string[] | null;
  onClick?: ((e: React.MouseEvent<Element, React.MouseEvent>) => void) &
    React.MouseEvent<Element, React.MouseEvent>;
};
export type GridViewCard_Places = {
  itemIndex?: number;
  img?: string;
  title: string;
  subTitle: string;
  dateString: string;
  period?: string[] | null;
  onClick?: ((e: React.MouseEvent<Element, React.MouseEvent>) => void) &
    React.MouseEvent<Element, React.MouseEvent>;
  setEdit: (payload: Place) => void;
  record: Place
};
export type GridViewCard_Events = {
  // key?: number
  img?: string;
  title: string;
  subTitle: string;
  dateString: string;
  isNew: boolean;
  handleClick: (item: Event, index: number) => void
  setEdit: (item: Event) => void
  record: Event;
  id: string;
};

export type InventoryAssociationType = {
  id: number
  placeNameEnglish: string
  placeNameArabic: string
  placeNumber: string | null
}
export type InventoryAssociationType_Event = {
  id: string
  visitNumber: string
  placeNameEnglish: string
  placeNameArabic: string
  placeNumber: string | null
}

export type SearchResultsState2 = {
  selectedCardIndex: number;
  searchApply: boolean;
  totalCounts: DashboardResponse | null;
  searchText: string;
  places: Place[] | [];
  events: Event[] | [];
  library: Media[] | [];
  media: Media[] | [];
  placeMetaData: Meta | null;
  eventMetaData: Meta | null;
  libararyMetaData: Meta | null;
  mediaMetaData: Meta | null;
  activeTab: tabNameProps | "";
  newItemWindowOpen: boolean;
  showAddSuccess: boolean;
  showEditSuccess: boolean;
  activePlaceItem: Place | null;
  activePlaceItemIndex: number;
  activeEventItem: EventApi | null;
  activeEventItemIndex: number;
  activeMediaItem: Media | null;
  activeMediaItemIndex: number;
  isOpenGalleryView: boolean
  addNewItemWindowType: tabNameProps | null
  isAssociationsStepOpen: boolean
  associatedPlaces: InventoryAssociationType[] | []
  associatedEvents: InventoryAssociationType_Event[] | []
  addItemWindowMinimized: boolean | null
  addItemProgressState: null | addItemProgressPayload
  isAssociationsIconsDisabled: boolean
};

export type addItemProgressPayload = addItemProgressStateType | addPlaceProgressStateType | 
  addEventProgressStateType | addMediaProgressStateType

export type addItemProgressStateType = {
  activeStep :number,
  formData: {
    place: string
    eventDate: Date
    recordingTeam: string
    siteDescription: string
    fieldNarrative: string
    siteType: string
    keywords: Array<string>,
  }
}
export type addPlaceProgressStateType = {
  activeStep :number
  formData: {
    placeNumber: string
    placeNameEnglish: string
    placeNameArabic: string
    siteDescription: string
    siteType: string[],
    period: string[],
    stateOfConservation: string
    risk: string
    tourismValue: string
    researchValue: string
    artifacts: string
    recommendation: string
    latitude: number | null,
    longitude: number | null,
    keywords: string[],
  }
}
export type addEventProgressStateType = {
  activeStep :number
  formData: {
    place: string,
    eventDate: Date | undefined,
    recordingTeam: string
    visitNumber: string | Number | null
    siteDescription: string
    fieldNarrative: string
    artifacts: string
    latitude: Number | number | null,
    longitude: Number | number | null,
    assessmentType: string
    stateOfConservation: string
    siteType: string | never[]
    risk: string
    tourismValue: string
    researchValue: string
    recommendation: string
    period: string[]
    keywords: string | never[]
  }
}
export type addMediaProgressStateType = {
  activeStep :number
  formData: {
    mediaType: string
    title: string
    bearing: string
    description: string
    Author: string
    categoryType: string[]
    latitude: null,
    longitude: null,
    refrerenceUrl: string
    keywords: string[]
  }
}

export type FileDataType = {
  src?: string;
  alt?: string;
  className: string;
  thumbNail?: string;
  isOpened?: boolean; // to directly render video or embedded code, instead of displaying play icon
};

export type RenderFileDataProps = {
  fileType: "image" | "video" | "3d";
  fileData: FileDataType;
};

export type CommentSectionProps = {
  SelfIcon: () => JSX.Element;
};

export type commentType = {
  commentor: string;
  comment: string;
  timeStamp: string;
  nestedCommentsCount: number;
  nestedComments?: Array<commentType>;
  nestingLevel: number;
};
export type SingleCommentProps = {
  SelfIcon: () => JSX.Element;
  commentObj: commentType;
};

export type VideoModalProps = {
  videoSrc: string;
  isModalOpen: boolean;
  toggleModal: () => void;
};

export type MediaDetailsPageProps = {
  currentItemIndex: any;
  data: any;
  currentRecord: any;
};

type menuAction = {
  label: string;
  action: () => void;
};

export type CustomMoreOptionsComponentProps = {
  menuActions: Array<menuAction>;
  moreIconClassName?: string
};

export type DetachedIconTypes ={
  className?: string
  style?: React.CSSProperties
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void
  shouldShowAttachIcon?: boolean
}
