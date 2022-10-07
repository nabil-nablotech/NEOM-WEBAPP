import React from 'react'
import Select from '@mui/material/Select';
import { DropdownCompProps } from '../../types/DropdownComponent';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const DropdownComponent = ({
    className,
    label,
    value,
    handleChange,
    itemsList,
    name
}: DropdownCompProps) => {

    const staticLabel = label ? label : 'select'
    return (
        <div className={className}>
            <FormControl sx={{ minWidth: 120, }}>
                {value &&
                    <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                }
                <Select
                    labelId={staticLabel}
                    id="simple-select"
                    value={value}
                    name={name}
                    label={staticLabel}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>{staticLabel}</em>;
                        }

                        // @ts-ignore
                        return selected.toString().join(', ');
                    }}
                >
                    <MenuItem disabled value="">
                        <em>{staticLabel}</em>
                    </MenuItem>
                    {
                        itemsList.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default DropdownComponent;