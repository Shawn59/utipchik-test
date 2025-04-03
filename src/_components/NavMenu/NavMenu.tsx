import { FC } from 'react';
import { Box, Drawer, Divider, IconButton, List, Button } from '@mui/material';
import { KeyboardTab as KeyboardTabIcon, FindInPageOutlined as FindInPageOutlinedIcon } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import { useOpenHook } from '@hooks';
import classNames from 'classnames';
import styles from './NavMenu.module.scss';
import Slide from '@mui/material/Slide';
import { observer } from 'mobx-react-lite';
import { ButtonAtom } from '@atoms';

const routerData = {};

/*routerConfig.forEach((item) => {
  routerData[item.id] = { ...item };
});*/

interface IListItemButton {
  startIconBtn: JSX.Element;
  handleClick: (isBlank?: boolean) => void;
  endIconBtn?: JSX.Element;
  labelBtn?: string;
  classNameBtn?: string;
}

const ListItemButton: FC<IListItemButton> = (props) => {
  const { startIconBtn, endIconBtn, labelBtn, classNameBtn, handleClick } = props;

  const handleMouseDown = (e) => {
    if (e.button === 1 || (e.ctrlKey && e.button === 0)) {
      handleClick(true);
    }
  };

  const onClick = () => {
    handleClick();
  };

  return (
    <Button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      startIcon={startIconBtn}
      endIcon={endIconBtn}
      className={classNames(styles.listItemBtn, classNameBtn)}
    >
      <Slide in={!!labelBtn} direction={'left'}>
        <span className={styles.itemLabelBtn}>{labelBtn}</span>
      </Slide>
    </Button>
  );
};

export const NavMenuComp = observer((props) => {
  const { isOpen, handleOpen, handleClose } = useOpenHook(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isSelectedItemSubMenu = (pathName: string) => {
    return !!matchPath(pathName, location.pathname);
  };

  const isSelectedItemMenu = (subMenuList: any[]) => {
    return !!subMenuList.find((item) => item.selected);
  };

  const setLocation = (path: string, isBlank = false) => {
    if (isBlank) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <Box className={styles.navMenuContainer}>
      <Drawer variant="permanent" open={isOpen} className={isOpen ? styles.drawerOpen : styles.drawerClose}>
        <div className={classNames(styles.menuHeader, !isOpen ? styles.alignCenter : '')}>
          {isOpen ? (
            <>
              <img src={logoStr} alt={''} />

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
          <ListItem className={classNames(styles.listItem)}>
            <ListItemButton
              labelBtn={'контент бэйз'}
              classNameBtn={styles.itemSubMenuBtn}
              startIconBtn={<FindInPageOutlinedIcon className={styles.itemIcon} />}
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
});
