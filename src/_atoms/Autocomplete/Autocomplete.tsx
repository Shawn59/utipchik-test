import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  Box,
  InputAdornment,
  TextField, Typography,
} from '@mui/material';
import { FC } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import styles from './Autocomplete.module.scss';
import classNames from 'classnames';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import * as React from 'react';

interface IAutocompleteAtomOption {
  id: number;
  label: string;

  [key: string]: any;
}

interface IAutocompleteAtom {
  label: string;
  onInputChange: (keywords: string) => void;
  options: IAutocompleteAtomOption[];
  isSearchIcon?: boolean;
  className?: string;
}

export const AutocompleteAtom: FC<IAutocompleteAtom> = (props) => {
  const { isSearchIcon, label, className = '', onInputChange, options } = props;

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
    onInputChange(keywords);

    // console.log('reason = ', reason);

    // Метод для debouncing (дергает запрос по истечению последнего события). Тогда запрос на опции передаем в пропсе onGetOptions
    /* if (delayedQuery) {
       delayedQuery();
     }*/
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

  return (
    <Autocomplete
      className={classNames(styles.autocompleteAtom, className)}
      renderInput={handleRenderInput}
      onInputChange={handleInputChange}
      options={options ?? []}
      renderOption={handleRenderOptions}
      getOptionLabel={(option) => option.label}
      filterOptions={handleFilterOptions}
      filterSelectedOptions
    />
  );
};