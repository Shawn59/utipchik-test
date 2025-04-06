import { FC, JSX } from 'react';
import { Box, Drawer, Divider, IconButton, List, Button } from '@mui/material';
import {
  KeyboardTab as KeyboardTabIcon,
  FindInPageOutlined as FindInPageOutlinedIcon,
  SourceOutlined as SourceOutlinedIcon,
} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import { useOpenHook } from '@hooks';
import classNames from 'classnames';
import styles from './NavMenu.module.scss';
import Slide from '@mui/material/Slide';
import logoStr from '/mos-metro-logo.svg?url';
import { matchPath, useNavigate } from 'react-router-dom';

interface INavMenuComp {}

interface IListItemButton {
  startIconBtn: JSX.Element;
  endIconBtn?: JSX.Element;
  labelBtn?: string;
  onClick: (isBlank?: boolean) => void;
}

const ListItemButton: FC<IListItemButton> = (props) => {
  const { startIconBtn, endIconBtn, labelBtn, onClick, ...rest } = props;


  const handleClick = () => {
   onClick();
  }

  const handleMouseDown = (e) => {
    if (e.button === 1 || (e.ctrlKey && e.button === 0)) {
      onClick(true);
    }
  };
  //TODO: разобраться с classNames её типизацией

  return (
    <Button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      startIcon={startIconBtn}
      endIcon={endIconBtn}
      className={styles.listItemBtn}
      {...rest}
    >
      <Slide in={!!labelBtn} direction={'left'}>
        <span className={styles.itemLabelBtn}>{labelBtn}</span>
      </Slide>
    </Button>
  );
};

export const NavMenuComp = () => {
  const { isOpen, handleOpen, handleClose } = useOpenHook(true);

  const navigate = useNavigate();

  const setLocation = (path: string, isBlank = false) => {
    if (isBlank) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const navMenuData = [
    {
      id: 1,
      path: '/content-base',
      label: 'База контента',
      onClick: () => setLocation('/content-base'),
    },
    {
      id: 2,
      path: '/media-plans',
      label: 'Медиапланы',
      onClick: () => setLocation('/media-plans'),
    },
    {
      id: 3,
      path: '/live-broadcast',
      label: 'Online - Вещание',
      onClick: () => setLocation('/live-broadcast'),
    },

    {
      id: 4,
      path: '/emergency-information',
      label: 'Информирование',
      onClick: () => setLocation('/emergency-information'),
    },

    {
      id: 5,
      path: '/interactive-map',
      label: 'Интерактивная карта',
      onClick: () => setLocation('/interactive-map'),
    },

    {
      id: 6,
      path: '/monitoring',
      label: 'Мониторинг',
      onClick: () => setLocation('/monitoring'),
    },

    {
      id: 7,
      path: '/users',
      label: 'Пользователи',
      onClick: () => setLocation('/users'),
    },

    {
      id: 8,
      path: '/reports',
      label: 'Отчет',
      onClick: () => setLocation('/reports'),
    },

    {
      id: 9,
      path: '/ad-moderation',
      label: 'Модерация рекламы',
      onClick: () => setLocation('/ad-moderation'),
    },

    {
      id: 10,
      path: '/settings',
      label: 'Настройки',
      onClick: () => setLocation('/settings'),
    },
  ];

  return (
    <Box className={styles.navMenuContainer}>
      <Drawer variant="permanent" open={isOpen} className={isOpen ? styles.drawerOpen : styles.drawerClose}>
        <div className={classNames(styles.menuHeader, !isOpen ? styles.alignCenter : '')}>
          {isOpen ? (
            <>
              <img src={logoStr} className={styles.logo} alt={''} />

              <IconButton onClick={handleClose} className={classNames(styles.arrow, styles.arrowLeft)}>
                <KeyboardTabIcon />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={handleOpen} className={styles.arrow}>
              <KeyboardTabIcon />
            </IconButton>
          )}
        </div>

        <Divider />

        <List>
          {navMenuData.map((item) => (
            <ListItem
              key={item.id}
              className={classNames(styles.listItem, !!matchPath(item.path, location.pathname) ? styles.selected : '')}
            >
              <ListItemButton
                labelBtn={isOpen ? item.label : ''}
                startIconBtn={<SourceOutlinedIcon className={styles.itemIcon} />}
                onClick={item.onClick}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
