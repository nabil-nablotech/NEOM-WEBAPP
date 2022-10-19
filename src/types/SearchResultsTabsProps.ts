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
    // activePlaceItem: Object
}

export type FileDataType = {
    src: string
    alt?: string
    className: string
}

export type RenderFileDataProps = {
    fileType: "image"
    fileData: FileDataType
}

export type CommentSectionProps = {
    SelfIcon: () => JSX.Element
}