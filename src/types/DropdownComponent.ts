import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';

export type DropdownCompProps = {
    className?: string
    label?: string
    value: string
    handleChange: (event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement> , child: React.ReactNode) => void
    itemsList: Array<dropDownItem>
}

type dropDownItem = {
    label: string
    value: string
}