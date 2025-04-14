import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ru } from 'date-fns/locale';
import React, { FC, useState } from 'react';
import { Popover } from '@mui/material';
import { ButtonAtom } from '../Button/Button';
import styles from './DatePickerRange.module.scss';
import { format } from 'date-fns';

interface IDatePickerRangeAtom {
  onChange: (range: any) => void;
  rangeValue: Range[];
}

export const DatePickerRangeAtom: FC<IDatePickerRangeAtom> = (props) => {
  const { onChange, rangeValue } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null | undefined>(null);

  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (ranges) => {
    setRanges([ranges.selection]);
  };

  const submit = () => {
    onChange(ranges);

    handleClose();
  };

  const clear = () => {
    setRanges([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    ]);

    onChange([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    ]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const startDateFormatted =
    rangeValue && rangeValue[0]?.startDate ? format(rangeValue[0].startDate as any, 'dd.MM.yyyy') : '';
  const endDateFormatted =
    rangeValue && rangeValue[0]?.endDate ? format(rangeValue[0].endDate as any, 'dd.MM.yyyy') : '';

  return (
    <div className={styles.datePickerRangeAtom}>
      <Popover
        className={styles.pop}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={styles.content}>
          <DateRange
            locale={ru}
            dateDisplayFormat={'dd.MM.yyyy'}
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={ranges as any}
          />

          <ButtonAtom label={'Принять'} size={'small'} onClick={submit} />
        </div>
      </Popover>

      <div className={styles.content}>
        <ButtonAtom aria-describedby={id} label={'Изменить'} onClick={handleClick} size={'small'} />

        {rangeValue && rangeValue[0].endDate && (
          <ButtonAtom label={'Сбросить'} onClick={clear} theme={'Secondary'} size={'small'} />
        )}

        {startDateFormatted && endDateFormatted && <div>{`${startDateFormatted} - ${endDateFormatted}`}</div>}
      </div>
    </div>
  );
};
