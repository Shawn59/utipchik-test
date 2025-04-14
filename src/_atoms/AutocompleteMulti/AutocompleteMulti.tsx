import React, { FC, HTMLAttributes, useRef } from 'react';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    InputAdornment,
    TextField,
    Box,
    Typography,
    Checkbox,
} from '@mui/material';
import {
    Search,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import styles from '../styles.scss';
import { IAutocompleteMultiAtom, IAutocompleteAtomOptions } from '../interfaces';
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete/Autocomplete';
import classNames from 'classnames';
import lodash from 'lodash';

export const AutocompleteMultiAtom: FC<IAutocompleteMultiAtom> = (props) => {
    const {
        isSearchIcon,
        options,
        label,
        onInputValueChange,
        onSearchInputValue,
        noOptionsText = 'Ничего не найдено',
        className,
        onChange,
        inputValue,
        disablePortal = false,
        selectOnFocus = false,
        clearOnBlur = false,
        disableInput,
        error,
        helperText,
        onGetOptions,
        ...rest
    } = props;

    const handleChange = (event: any, options: IAutocompleteAtomOptions[]) => {
        onChange(options);
    };

    const delayedQuery = onGetOptions ? useRef(lodash.debounce(onGetOptions, 200)).current : null;

    const handleInputChange = (e: any, value: string) => {
        //По дефолту запрос на получение опций нужно прописывать в пропсе onInputValueChange
        onInputValueChange(value);

        // Метод для тротлинга(задержка вызова запроса). Тогда запрос на опции передаем в пропсе onGetOptions
        if (delayedQuery) {
            delayedQuery();
        }
    };

    const handleKeyDown = (e: any) => {
        if (onSearchInputValue && e.key === 'Enter') {
            e.defaultMuiPrevented = true;
            onSearchInputValue();
        }
    };

    const renderInput = (params: AutocompleteRenderInputParams) => {
        if (isSearchIcon) {
            params.InputProps.startAdornment = (
                <InputAdornment position="start">
                    <Search className={styles.searchIcon} />
                </InputAdornment>
            );
        }

        return <TextField label={label} {...params} />;
    };

    const renderOptions = (
        props: HTMLAttributes<HTMLLIElement>,
        option: IAutocompleteAtomOptions,
        { inputValue, selected }: AutocompleteRenderOptionState
    ) => {
        const matches = match(option.title.toLowerCase(), inputValue, {
            findAllOccurrences: true,
            insideWords: true,
        });
        const parts = parse(option.title, matches);

        const colored = {
            color: '#3672E3',
            fontWeight: 'bold',
        };

        return (
            <Box component="li" {...props} key={option.value} sx={{ color: '#304659', cursor: 'pointer' }}>
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={!!selected}
                />

                <Box
                    sx={{
                        padding: '10px 0',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        '& span': { fontSize: '14px' },
                    }}
                >
                    {parts.map((part, index) => (
                        <Typography component={'span'} key={index} sx={part.highlight ? colored : null} noWrap>
                            {part.text}
                        </Typography>
                    ))}
                </Box>
            </Box>
        );
    };

    const handleFilterOptions = (option) => {
        return option;
    };

    return (
        <div className={classNames(styles.autocompleteAtomContainer, className, error ? styles.errorState : '')}>
            <Autocomplete
                multiple
                //disableCloseOnSelect
                className={styles.autocompleteAtom}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={onChange ? handleChange : null}
                onKeyDown={handleKeyDown}
                popupIcon={<KeyboardArrowDownIcon />}
                noOptionsText={noOptionsText}
                options={options}
                getOptionLabel={(option) => option.title}
                renderInput={renderInput}
                renderOption={renderOptions}
                filterOptions={handleFilterOptions}
                isOptionEqualToValue={(option, selectedOption) => {
                    return option.value === selectedOption.value;
                }} // задачем сравнение опций
                {...rest}
            />

            {error && <div className={styles.helperError}>{helperText}</div>}
        </div>
    );
};
