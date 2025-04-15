import React, { FC } from 'react';
import { Chip, ChipProps } from '@mui/material';
import styles from './Chip.module.scss';
import classNames from 'classnames';

export type IChipAtomValue = string | number;

interface IChipAtom {
  label: string | React.ReactNode;
  value: IChipAtomValue;
  theme?: 'Primary' | 'Outlined' | 'Secondary';
  disableRipple?: boolean;
  isSelected?: boolean;
  onClick?: (value: IChipAtomValue) => void;
  deleteIcon?: React.ReactElement<unknown>;
  onDelete?: (value: IChipAtomValue) => void;
  size?: 'middle' | 'small';
}

export const ChipAtom: FC<IChipAtom> = (props) => {
  const { label, onClick, theme = 'Primary', isSelected, value, deleteIcon, onDelete, size = 'middle' } = props;

  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(value);
    }
  };

  return (
    <div className={classNames(styles.chipAtomContainer, styles[theme], styles[size])}>
      <Chip
        label={label}
        style={onDelete ? { cursor: 'default' } : undefined}
        onClick={handleClick}
        className={isSelected ? styles.selected : ''}
        deleteIcon={deleteIcon}
        onDelete={onDelete ? handleDelete : undefined}
      />
    </div>
  );
};
