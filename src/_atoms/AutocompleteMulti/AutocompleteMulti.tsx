import React, { FC, HTMLAttributes } from 'react';
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
import styles from './AutocompleteMulti.module.scss';
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete/Autocomplete';
import classNames from 'classnames';

export interface IAutocompleteMultiAtomOption {
  value: number;
  label: string;

  [key: string]: any;
}

interface IAutocompleteMultiAtom {
  label: string;
  options: IAutocompleteMultiAtomOption[];
  inputValue: string;
  onInputValueChange: (inputValue: string) => void;
  onSearchInputValue?: () => void;
  isSearchIcon?: boolean;
  className?: string;
  noOptionsText?: string;
  multiple?: boolean;
  disablePortal?: boolean;
  selectOnFocus?: boolean;
  clearOnBlur?: boolean;
  value?: any;
  defaultValue?: any;
  disableInput?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  onGetOptions?: () => void;
  onChange?: (option: IAutocompleteMultiAtomOption[]) => void;
}

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

  const handleChange = (_event: any, options: IAutocompleteMultiAtomOption[]) => {
    if (onChange) {
      onChange(options);
    }
  };

  //const delayedQuery = onGetOptions ? useRef(lodash.debounce(onGetOptions, 200)).current : null;

  const handleInputChange = (_e: any, value: string) => {
    //По дефолту запрос на получение опций нужно прописывать в пропсе onInputValueChange
    onInputValueChange(value);

    // Метод для тротлинга(задержка вызова запроса). Тогда запрос на опции передаем в пропсе onGetOptions
    /*if (delayedQuery) {
      delayedQuery();
    }*/

    if (onGetOptions) {
      onGetOptions();
    }
  };

  const handleKeyDown = (e: any) => {
    if (onSearchInputValue && e.key === 'Enter') {
      e.defaultMuiPrevented = true;
      onSearchInputValue();
    }
  };

  const renderInput = (params: AutocompleteRenderInputParams) => {
    return <TextField label={label} {...params} />;
  };

  const renderOptions = (
    props: HTMLAttributes<HTMLLIElement>,
    option: IAutocompleteMultiAtomOption,
    { inputValue, selected }: AutocompleteRenderOptionState,
  ) => {
    const { key, ...optionProps } = props;

    const matches = match(option.label.toLowerCase(), inputValue, {
      findAllOccurrences: true,
      insideWords: true,
    });
    const parts = parse(option.label, matches);

    const colored = {
      color: '#3672E3',
      fontWeight: 'bold',
    };

    return (
      <Box key={key} component="li" {...optionProps} sx={{ color: '#304659', cursor: 'pointer' }}>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
          checkedIcon={<CheckBoxIcon fontSize="medium" />}
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
            display: 'flex',
          }}
        >
          {parts.map((part, index) => (
            <Typography key={index} sx={part.highlight ? colored : null} noWrap>
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
    <div className={classNames(styles.autocompleteMultiAtom, className as any)}>
      <Autocomplete
        multiple
        disableCloseOnSelect
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={onChange ? (handleChange as any) : null}
        onKeyDown={handleKeyDown}
        popupIcon={<KeyboardArrowDownIcon />}
        noOptionsText={noOptionsText}
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={renderInput}
        renderOption={renderOptions}
        filterOptions={handleFilterOptions}
        isOptionEqualToValue={(option, selectedOption) => {
          return option.value === selectedOption.value;
        }} // задачем сравнение опций
        freeSolo
        {...rest}
      />

      {error && <div className={styles.helperError}>{helperText}</div>}
    </div>
  );
};
