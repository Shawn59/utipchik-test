import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import styles from './Autocomplete.module.scss';
import classNames from 'classnames';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import * as React from 'react';

export interface IAutocompleteAtomOption {
  id: number;
  label: string;

  [key: string]: any;
}

interface IAutocompleteAtom {
  label: string;
  options: IAutocompleteAtomOption[];
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
  onChange?: (option: IAutocompleteAtomOption | null) => void;
}

export const AutocompleteAtom: FC<IAutocompleteAtom> = (props) => {
  const {
    isSearchIcon,
    label,
    inputValue,
    className = '',
    onInputValueChange,
    options,
    onChange,
    onSearchInputValue,
    onGetOptions,
    ...rest
  } = props;

  const handleKeyDown = (e: any) => {
    if (onSearchInputValue && e.key === 'Enter') {
      e.defaultMuiPrevented = true;
      onSearchInputValue();
    }
  };

  const handleRenderInput = (params: AutocompleteRenderInputParams) => {
    if (isSearchIcon) {
      params.InputProps.startAdornment = (
        <InputAdornment position="start">
          <SearchIcon className={styles.searchIcon} />
        </InputAdornment>
      );
    }

    return <TextField label={label} {...params} />;
  };

  const handleInputChange = (_e: React.SyntheticEvent, keywords: string) => {
    //По дефолту запрос на получение опций нужно прописывать в пропсе onInputValueChange
    onInputValueChange(keywords);

    // Метод для debouncing (дергает запрос по истечению последнего события). Тогда запрос на опции передаем в пропсе onGetOptions
    /* if (delayedQuery) {
       delayedQuery();
     }*/

    if (onGetOptions) {
      onGetOptions();
    }
  };

  const handleFilterOptions = (option) => {
    return option;
  };

  const handleRenderOptions = (props, option, { inputValue }: AutocompleteRenderOptionState) => {
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
      <Box key={option.id} component="li" sx={{ cursor: 'pointer' }} {...optionProps}>
        <Box
          sx={{
            padding: '10px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            '& span': {
              fontSize: '14px',
              opacity: '0.8',
              color: option.isNotActive ? '#A8AAB5' : '#304659',
            },
          }}
        >
          {parts.map((part, index) => (
            <span key={index} style={part.highlight ? colored : undefined}>
              {part.text}
            </span>
          ))}
        </Box>
      </Box>
    );
  };

  const handleChange = (_event: any, option: IAutocompleteAtomOption | null) => {
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Autocomplete
      inputValue={inputValue}
      className={classNames(styles.autocompleteAtom, className as any)}
      renderInput={handleRenderInput}
      onInputChange={handleInputChange}
      options={options ?? []}
      renderOption={handleRenderOptions}
      getOptionLabel={(option) => option.label}
      filterOptions={handleFilterOptions}
      filterSelectedOptions
      onChange={onChange ? (handleChange as any) : null}
      isOptionEqualToValue={(option, selectedOption) => {
        return option.value === selectedOption.value;
      }} // задачем сравнение опций
      clearText={'Очистить'}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
};
