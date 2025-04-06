import { FC } from 'react';
import { Chip, ChipProps } from '@mui/material';
import styles from './Chip.module.scss';
import classNames from 'classnames';

interface IChipAtom {
  theme?: 'Primary' | 'Outlined';
  disableRipple?: boolean;
  isSelected: boolean;
  onClick: (value: number) => void;
  value: number;
  label: string;
}

export const ChipAtom: FC<IChipAtom> = (props) => {
  const { label, onClick, theme = 'Primary', isSelected, value } = props;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div className={classNames(styles.chipAtomContainer, styles[theme])}>
      <Chip label={label} onClick={handleClick} className={isSelected ? styles.selected : ''} />
    </div>
  );
};
