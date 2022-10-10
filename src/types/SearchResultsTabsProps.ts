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

export type GridViewCard = {
    key?: number
    img: string
    title: string
    subTitle: string
    dateString: string
    keywords: Array<string>
}