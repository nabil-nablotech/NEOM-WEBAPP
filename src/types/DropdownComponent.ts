import { AutocompleteChangeDetails, AutocompleteChangeReason, SxProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent, MouseEvent } from 'react';

export type DropdownCompProps = {
    className?: string
    label?: string
    placeholder?: string
    selectStylesSx?: SxProps
    formControlSx?: SxProps
    value: string[] | string | undefined
    handleChange?: ((event: SelectChangeEvent<string | string[]> | ChangeEvent<HTMLInputElement>, child: React.ReactNode) => void)
    handleSelectChange?: ((event: React.SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => void) | undefined;
    handleClear: (e: MouseEvent<HTMLButtonElement>) => void;
    itemsList: Array<dropDownItem> | []
    name?: string
    multiple?: boolean;
}
export type AutoCompleteProps = {
    className?: string
    label?: string
    placeholder?: string
    selectStylesSx?: SxProps
    formControlSx?: SxProps
    value: string[] | undefined
    handleChange?: ((event: SelectChangeEvent<string | string[]> | ChangeEvent<HTMLInputElement>, child: React.ReactNode) => void)
    handleSelectChange?: ((event: React.SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined) => void) | undefined;
    handleClear: (e: MouseEvent<HTMLButtonElement>) => void;
    itemsList: Array<dropDownItem> | []
    name?: string
    multiple?: boolean;
}

export type dropDownItem = {
    label: string
    value: string
}