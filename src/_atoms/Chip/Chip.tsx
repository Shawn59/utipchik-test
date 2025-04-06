import { FC } from 'react';
import { Chip, ChipProps } from '@mui/material';
import styles from './ChipAtom.module.scss';
import classNames from 'classnames';

interface IChipAtom extends ChipProps {
  theme?: 'Filled' | 'Outlined' | 'Secondary';
  disableRipple?: boolean;
  isSelected?: boolean;
}

export const ChipAtom: FC<IChipAtom> = (props) => {
  const { label, onClick, theme = 'Filled', className = '', isSelected } = props;

  return (
    <div className={classNames(styles.chipAtomContainer, styles[theme], className)}>
      <Chip label={label} onClick={onClick} className={isSelected ? styles.selected : null} />
    </div>
  );
};
