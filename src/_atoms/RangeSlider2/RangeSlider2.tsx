import Slider from '@mui/material/Slider';
import { useState } from 'react';
import styles from './RangeSlider2.module.scss';

const marks = [
  { label: '0', value: 0 },
  { label: '30 сек.', value: 15 },
  { label: '1 минута', value: 25 },
  { label: '5 минут', value: 37 },
  { label: '15 минут', value: 56 },
  { label: '30 минут', value: 74 },
  { label: '1ч+', value: 100 },
];

export const RangeSliderAtom2 = () => {
  const [values, setValues] = useState([0, 450]);

  const handleChange = (_event: Event, newValue: number[]) => {
    if (newValue[0] !== newValue[1]) {
      setValues(newValue);
    }
    console.log('newValue = ', newValue);
  };

  return (
    <div className={styles.rangeSlider}>
      <Slider
        color={'primary'}
        className={styles.slider}
        getAriaLabel={() => 'Minimum distance shift'}
        value={values}
        onChange={handleChange as (event: Event, value: number | number[], activeThumb: number) => void}
        valueLabelDisplay="auto"
        marks={marks}
        step={null}
      />
    </div>
  );
};
