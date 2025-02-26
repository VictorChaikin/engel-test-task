import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

interface ICustomSelectProps {
  value: string;
  label: string;
  options: Array<{ label: string, value: string }>;
  onSelect: (value: string) => void;
}

export const CustomSelect = ({ options, value, label, onSelect }: ICustomSelectProps) => {

  const handleChange = (event: SelectChangeEvent) => {
   onSelect(event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={handleChange}
          value={value}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {options.map((op) => (
            <MenuItem
              key={op.label}
              value={op.value}
            >
              {op.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}