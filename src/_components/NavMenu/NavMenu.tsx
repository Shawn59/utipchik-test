import { FC } from 'react';
import { Box, Drawer, Divider, IconButton, List, Button } from '@mui/material';
import {
  KeyboardTab as KeyboardTabIcon,
  StorageOutlined as StorageOutlinedIcon,
  SubscriptionsOutlined as SubscriptionsOutlinedIcon,
  StreamOutlined as StreamOutlinedIcon,
  InfoOutlined as InfoOutlineIcon,
  MapOutlined as MapOutlinedIcon,
  RadarOutlined as RadarOutlinedIcon,
  PeopleOutline as PeopleOutlineIcon,
  SummarizeOutlined as SummarizeOutlinedIcon,
  SellOutlined as SellOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import { useOpenHook } from '@hooks';
import classNames from 'classnames';
import styles from './NavMenu.module.scss';
import Slide from '@mui/material/Slide';
import logoStr from '/mos-metro-logo.svg?url';
import { matchPath, useNavigate } from 'react-router-dom';
import { IListItemButton, INavMenuData } from './NavMenuInterfaces';
import { observer } from 'mobx-react-lite';
import { useStoresHook } from '../../hooks/useStoresHook';
import config from '../../../settings/config.js';

const ListItemButton: FC<IListItemButton> = (props) => {
  const { startIconBtn, endIconBtn, labelBtn, onClick, ...rest } = props;

  const handleClick = () => {
    onClick();
  };

  const handleMouseDown = (e) => {
    if (e.button === 1 || (e.ctrlKey && e.button === 0)) {
      onClick(true);
    }
  };

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

export const NavMenuComp = observer(() => {
  const { isOpen, handleOpen, handleClose } = useOpenHook(true);

  const { userStore } = useStoresHook();

  const navigate = useNavigate();

  const setLocation = (path: string, isBlank = false) => {
    if (isBlank) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const navMenuData: INavMenuData[] = [
    {
      id: 1,
      path: '/content-base',
      label: 'База контента',
      IconElem: StorageOutlinedIcon,
      onClick: () => setLocation('/content-base'),
    },
    {
      id: 2,
      path: '/media-plans',
      label: 'Медиапланы',
      IconElem: SubscriptionsOutlinedIcon,
      onClick: () => setLocation('/media-plans'),
    },
    {
      id: 3,
      path: '/live-broadcast',
      label: 'Online - Вещание',
      IconElem: StreamOutlinedIcon,
      onClick: () => setLocation('/live-broadcast'),
    },

    {
      id: 4,
      path: '/emergency-information',
      label: 'Информирование',
      IconElem: InfoOutlineIcon,
      onClick: () => setLocation('/emergency-information'),
    },

    {
      id: 5,
      path: '/interactive-map',
      label: 'Интерактивная карта',
      IconElem: MapOutlinedIcon,
      onClick: () => setLocation('/interactive-map'),
    },

    {
      id: 6,
      path: '/monitoring',
      label: 'Мониторинг',
      IconElem: RadarOutlinedIcon,
      onClick: () => setLocation('/monitoring'),
    },

    {
      id: 7,
      path: '/users',
      label: 'Пользователи',
      IconElem: PeopleOutlineIcon,
      onClick: () => setLocation('/users'),
    },

    {
      id: 8,
      path: '/reports',
      label: 'Отчет',
      IconElem: SummarizeOutlinedIcon,
      onClick: () => setLocation('/reports'),
    },

    {
      id: 9,
      path: '/ad-moderation',
      label: 'Модерация рекламы',
      IconElem: SellOutlinedIcon,
      onClick: () => setLocation('/ad-moderation'),
    },

    {
      id: 10,
      path: '/settings',
      label: 'Настройки',
      IconElem: SettingsOutlinedIcon,
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
          {navMenuData.map((item) => {
            const { IconElem } = item;

            return (
              <ListItem
                key={item.id}
                className={classNames(
                  styles.listItem,
                  !!matchPath(item.path, location.pathname) ? styles.selected : '',
                )}
              >
                <ListItemButton
                  labelBtn={isOpen ? item.label : ''}
                  startIconBtn={(<IconElem className={styles.itemIcon} />) as React.ReactElement}
                  onClick={item.onClick}
                />
              </ListItem>
            );
          })}
        </List>

        {userStore.userInfo && (
          <div className={styles.menuFooter}>
            <div className={classNames(styles.accountContainer, !isOpen ? styles.alignCenter : '')}>
              <Slide in={isOpen} direction={'left'}>
                <div className={!isOpen ? styles.hidden : ''}>
                  <div className={styles.fioContainer}>
                    <PersonIcon className={styles.fioIcon}/>

                    <div className={styles.fio}>{`${userStore.userInfo.fio}`}</div>
                  </div>

                  <span className={styles.role}>{userStore.userInfo.role}</span>

                  <div className={styles.version}>{config.version}</div>
                </div>
              </Slide>

              <IconButton className={styles.arrow}>
                <LogoutIcon />
              </IconButton>

              {!isOpen && <div className={styles.version}>{config.version}</div>}
            </div>
          </div>
        )}
      </Drawer>
    </Box>
  );
});
