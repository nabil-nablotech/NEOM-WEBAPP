import { SxProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { MouseEvent } from 'react';

export type DropdownCompProps = {
    className?: string
    label?: string
    placeholder?: string
    selectStylesSx?: SxProps
    formControlSx?: SxProps
    value: string[] | string
    handleChange: ((event: SelectChangeEvent<string | string[]>, child: React.ReactNode) => void)
    handleClear: (e: MouseEvent<HTMLButtonElement>) => void;
    itemsList: Array<dropDownItem> | []
    name?: string
    multiple?: boolean;
}

export type dropDownItem = {
    label: string
    value: string
}