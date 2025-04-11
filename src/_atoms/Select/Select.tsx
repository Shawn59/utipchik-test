import React, { FC } from 'react';
import { InputLabel, FormControl, MenuItem, Select, FormHelperText } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import styles from './styles.scss';
import { ISelectAtom } from '../interfaces';
import classNames from 'classnames';

export const SelectAtom: FC<ISelectAtom> = (props) => {
    const { options, label, onChange, value, isEmpty = false, className, ...rest } = props;

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl className={classNames(styles.selectAtomContainer, className)} sx={{ m: 1 }}>
            <InputLabel>{label}</InputLabel>

            <Select
                value={value !== undefined && value !== null ? value : ''}
                label={label}
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
                {...rest}
            >
                {isEmpty && (
                    <MenuItem key={'empty'} value={''}>
                        {'Не выбрано'}
                    </MenuItem>
                )}

                {options.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
