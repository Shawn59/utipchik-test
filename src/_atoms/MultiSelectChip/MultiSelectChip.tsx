import React, { FC } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Checkbox, ListItemText } from '@mui/material';
import styles from './MultiSelectChip.module.scss';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import classNames from 'classnames';
import { IMultiSelectChipAtom } from './MultiSelectChip.interfaces';

export const MultiSelectChip: FC<IMultiSelectChipAtom> = (props) => {
  const { options, onChange, value, label = '', className, ...rest } = props;

  const handleChange = (e: SelectChangeEvent<string[] | number[]>) => {
    const valueList = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;

    onChange(valueList);
  };

  return (
    <FormControl className={classNames(styles.multiSelectChipAtomContainer, className as any)}>
      <InputLabel>{label}</InputLabel>

      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={(<OutlinedInput label={label} />) as React.ReactElement}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => {
              const option = options.find((item) => item.value === value);

              return option ? <Chip key={value} label={option.label} /> : null;
            })}
          </Box>
        )}
        IconComponent={KeyboardArrowDownIcon}
        {...rest}
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value} className={styles.multiSelectOptionItem}>
            <Checkbox checked={value.includes(item.value)} />

            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
