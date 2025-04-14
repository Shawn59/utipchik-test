import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FC } from 'react';

interface IRadioButtonsGroupAtom {
  radioOptions: {
    value: string | number;
    label: string;
  }[];
  isAll?: boolean;
  value: string | number;
  onChange: (value: string | number) => void;
}

export const RadioButtonsGroupAtom: FC<IRadioButtonsGroupAtom> = (props) => {
  const { radioOptions, isAll = true, value = 'all', onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup row value={value ? value : 'all'} onChange={handleChange}>
        {isAll && <FormControlLabel value={'all'} control={(<Radio />) as React.ReactElement} label={'Все'} />}

        {radioOptions.map((item) => {
          return (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={(<Radio />) as React.ReactElement}
              label={item.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
