import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';
import { DropdownCompProps } from "../../types/DropdownComponent";
import { MenuItem, Box, IconButton } from "@mui/material";
import { ClearOutlined } from '@mui/icons-material';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const DropdownComponent = ({
  className,
  label,
  placeholder,
  value: values,
  handleChange,
  itemsList,
  name,
  selectStylesSx,
  formControlSx,
  multiple,
  handleClear
}: DropdownCompProps) => {
  const staticLabel = label ? label : "select";
  const [focused, setFocused] = useState(false);

  return (
    <div className={className}>
      <FormControl sx={{ minWidth: 120, ...formControlSx }}>
        {(focused || values) && (
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        )}
        <Select
          labelId={staticLabel}
          id="simple-select"
          multiple={multiple}
          value={values}
          name={name}
          label={staticLabel}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          displayEmpty
          sx={selectStylesSx}
          renderValue={(selected: any) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected?.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          endAdornment={<IconButton sx={{display: values.length>0 ? "visible": "none"}} onClick={handleClear} ><ClearOutlined fontSize={"small"} /></IconButton>}
        >
          <MenuItem disabled value="">
            <em>{staticLabel}</em>
          </MenuItem>
          {itemsList.map((item) => (
            <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownComponent;
