import Slider from '@mui/material/Slider';
import { FC, useMemo } from 'react';
import styles from './RangeSlider.module.scss';
import { IOptions } from '../Select/Select.interfaces';
import { Mark } from '@mui/material/Slider/useSlider.types';

interface IRangeSliderAtom {
  values: number[];
  minValue: number;
  maxValue: number;
  step: number;
  onChangeValue: (values: number[]) => void;
}

export const RangeSliderAtom: FC<IRangeSliderAtom> = (props) => {
  const { values, minValue, maxValue, step, onChangeValue } = props;

  const getMarks = useMemo(() => {
    const marks: Mark[] = [];

    for (let i = 0; i <= maxValue; i += 10) {
      marks.push({
        value: i,
        label: i === 0 || i === maxValue ? (i === maxValue ? `${i}+` : `${i}`) : '',
      });
    }

    return marks;
  }, []);

  const valueLabelFormat = (value: number) => {
    return value === 180 ? `${value}+` : `${value}`;
  };

  const handleChange = (_event: Event, newValue: number[], activeThumb: number) => {
    if (newValue[1] - newValue[0] < step) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxValue - step);

        onChangeValue([clamped, clamped + step]);
      } else {
        const clamped = Math.max(newValue[1], step);

        onChangeValue([clamped - step, clamped]);
      }
    } else {
      onChangeValue(newValue);
    }
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
        min={minValue}
        max={maxValue}
        marks={getMarks}
        step={step}
        valueLabelFormat={valueLabelFormat}
      />
    </div>
  );
};
