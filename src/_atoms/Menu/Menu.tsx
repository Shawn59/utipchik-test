import React, { FC } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import styles from './Menu.module.scss';
import classNames from 'classnames';
import Slide from '@mui/material/Slide';

export interface IIMenuAtomData {
  id: number;
  label: string;
  onClick: (isBlank?: boolean) => void;
  selected: boolean;
}

export interface IMenuAtom {
  labelBtn?: string;
  startIconBtn?: JSX.Element;
  endIconBtn?: JSX.Element;
  classNameBtn?: string;
  theme?: 'Primary';
  data: IIMenuAtomData[];
}

export const MenuAtom: FC<IMenuAtom> = (props) => {
  const { data, labelBtn, startIconBtn, endIconBtn, classNameBtn = '', children, theme = 'Primary', ...rest } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let menuThemeClass = '';

  switch (theme) {
    case 'Primary':
    default: {
      menuThemeClass = styles.menuPrimary;
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={startIconBtn}
        endIcon={endIconBtn}
        className={classNames(styles.menuAtomBtn, classNameBtn)}
      >
        <Slide in={!!labelBtn} direction={'left'}>
          <span className={styles.menuLabelItem}>{labelBtn}</span>
        </Slide>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={menuThemeClass}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        {...rest}
      >
        {data.map((item) => (
          <MenuItem
            key={item.id}
            onMouseDown={(e) => {
              if (e.button === 1 || (e.ctrlKey && e.button === 0)) {
                item.onClick(true);
              }
            }}
            onClick={() => {
              handleClose();
              item.onClick();
            }}
            className={item.selected ? styles.selected : ''}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
