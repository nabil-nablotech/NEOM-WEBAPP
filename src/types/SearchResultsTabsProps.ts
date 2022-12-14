import React from 'react';
import { DashboardResponse } from "./dashboard";
import {Place, Meta} from './Place';
import {Event} from './Event';
import {Media} from './Media';

export type SearchResultTabsProps = {
    tabIndex?: number
    handleSubmit?: () => void
}

export type LabelProps = {
    img: string,
    label: string
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    className: string;
}

export type tabNameProps = 'Places' | 'Events' | 'Library' | 'Media'

export type GridViewCard_Places = {
    img?: string
    title: string
    subTitle: string
    dateString: string
    keywords: string[] | null
    onClick?:((e: React.MouseEvent<Element, React.MouseEvent>) => void) & React.MouseEvent<Element, React.MouseEvent>
}
export type GridViewCard_Events = {
    // key?: number
    img?: string
    title: string
    subTitle: string
    dateString: string
    isNew: boolean
}

export type SearchResultsState2 = {
    selectedCardIndex: number 
    totalCounts: DashboardResponse | null
    searchText: string
    places: Place[] | []
    events: Event[] | []
    library: Media[] | []
    media: Media[] | []
    placeMetaData: Meta | null
    eventMetaData: Meta | null
    libararyMetaData: Meta | null
    mediaMetaData: Meta | null
    activeTab: tabNameProps | ''
    newItemWindowOpen: boolean
    showAddSuccess: boolean
    activePlaceItem: Place | null
    activePlaceItemIndex: number
    activeMediaItem: Media | null
    activeMediaItemIndex: number
}

export type FileDataType = {
    src: string
    alt?: string
    className: string
    thumbNail?: string
    isOpened?: boolean // to directly render video or embedded code, instead of displaying play icon
}

export type RenderFileDataProps = {
    fileType: "image" | "video"
    fileData: FileDataType
}

export type CommentSectionProps = {
    SelfIcon: () => JSX.Element
}

export type  commentType = {
    commentor: string,
    comment: string,
    timeStamp: string,
    nestedCommentsCount: number
    nestedComments?: Array<commentType>
    nestingLevel: number
}
export type SingleCommentProps = {
    SelfIcon: () => JSX.Element
    commentObj: commentType
}

export type VideoModalProps = {
    videoSrc: string
    isModalOpen: boolean
    toggleModal: () => void
}

export type MediaDetailsPageProps = {
    currentItemIndex: any
    data: any
    currentRecord: any
}

type menuAction = {
    label: string
    action: () => void
}

export type CustomMoreOptionsComponentProps = {
    menuActions: Array<menuAction>
}