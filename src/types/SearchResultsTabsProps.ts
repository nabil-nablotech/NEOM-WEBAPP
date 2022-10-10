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
}

export type tabNameProps = 'Places' | 'Events' | 'Library' | 'Media'