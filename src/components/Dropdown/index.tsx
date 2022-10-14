import Select from "@mui/material/Select";
import { DropdownCompProps } from "../../types/DropdownComponent";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const DropdownComponent = ({
  className,
  label,
  placeholder,
  value,
  handleChange,
  itemsList,
  name,
  selectStylesSx,
  formControlSx
}: DropdownCompProps) => {
  const staticLabel = label ? label : "select";
  const [focused, setFocused] = useState(false);

  return (
    <div className={className}>
      <FormControl sx={{ minWidth: 120, ...formControlSx }}>
        {(focused || value) && (
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        )}
        <Select
          labelId={staticLabel}
          id="simple-select"
          value={value}
          name={name}
          label={staticLabel}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          displayEmpty
          sx={selectStylesSx}
          // renderValue={(selected) => {
          //   if (selected.length === 0) {
          //     return <em>{staticLabel}</em>;
          //   }

          //   // @ts-ignore
          //   // return selected.toString().join(", ");
          // }}
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
