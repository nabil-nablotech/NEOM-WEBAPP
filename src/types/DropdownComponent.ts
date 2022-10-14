import { SxProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';

export type DropdownCompProps = {
    className?: string
    label?: string
    placeholder?: string
    selectStylesSx?: SxProps
    formControlSx?: SxProps
    value: "" | HTMLSelectElement | undefined
    handleChange: (event: SelectChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> , child: React.ReactNode) => void
    itemsList: Array<dropDownItem> | []
    name?: string
}

export type dropDownItem = {
    label: string
    value: string
}