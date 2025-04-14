import { FC, JSX } from 'react';
import { Button } from '@mui/material';
import styles from './Button.module.scss';
import classNames from 'classnames';

export interface IButtonAtom {
  label?: string;
  className?: string;
  onClick?: (e?: any) => void;
  theme?:
    | 'Primary'
    | 'Secondary'
    | 'Outline'
    | 'Ternary'
    | 'Delete-Primary'
    | 'Delete-Secondary'
    | 'Copy-Primary'
    | 'Success';
  disabled?: boolean;
  size?: 'small' | 'middle';
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

export const ButtonAtom: FC<IButtonAtom> = (props) => {
  const { className, label, theme = 'Primary', size = 'middle', ...rest } = props;

  return (
    <Button className={classNames(styles.buttonAtom, styles[theme], styles[size], className)} {...rest}>
      {label}
    </Button>
  );
};
