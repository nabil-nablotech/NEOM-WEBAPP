import React from 'react';
import { DashboardResponse } from "./dashboard";

export type SearchResultTabsProps = {
    tabIndex?: number
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
    img: string
    title: string
    subTitle: string
    dateString: string
    isNew: boolean
}

export type SearchResultsState2 = {
    selectedCardIndex: number 
    totalCounts: DashboardResponse | null
    searchText: string
}