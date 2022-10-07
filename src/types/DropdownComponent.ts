import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';

export type DropdownCompProps = {
    className?: string
    label?: string
    value: "" | HTMLSelectElement | undefined
    handleChange: (event: SelectChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> , child: React.ReactNode) => void
    itemsList: Array<dropDownItem>
    name?: string
}

type dropDownItem = {
    label: string
    value: string
}