import React, { FC, useEffect } from 'react';
import { Box, Drawer, Divider, IconButton, List, MenuItem, Button } from '@mui/material';
import {
    KeyboardTab as KeyboardTabIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    Logout as LogoutIcon,
    Percent as PercentIcon,
    FindInPageOutlined as FindInPageOutlinedIcon,
    DescriptionOutlined as DescriptionOutlinedIcon,
} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import { routerConfig } from '../../routes/routerConfig';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import { CashBackIcon } from '@svgIcons';
import { useOpenHook, useStoresHook } from '@hooks';
import classNames from 'classnames';
import styles from './styles.scss';
import { MenuAtom } from '../../_atoms';
import logoStr from '../../../public/logo.png';
import config from '../../../settings/config.json';
import { LocalStorageService } from '@services';
import Slide from '@mui/material/Slide';
import { breakPoints, routeConst } from '@constants';
import { useResizeScreen } from '../../hooks/useResizeScreenHook';
import { observer } from 'mobx-react-lite';

const routerData = {};
routerConfig.forEach((item) => {
    routerData[item.id] = { ...item };
});

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

export const NavMenu = observer((props) => {
    const { isOpen, handleOpen, handleClose } = useOpenHook(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { authStore } = useStoresHook();

    const { type } = useResizeScreen();

    useEffect(() => {
        const isMobile = type === breakPoints.names.mobile;

        if (isMobile) {
            handleClose();
        }
    }, [type]);

    const { menuSectionNames, pageNames } = routeConst;

    const userInfo = LocalStorageService.getItem('userInfo') || {};

    const isSelectedItemSubMenu = (pathName: string) => {
        return !!matchPath(pathName, location.pathname);
    };

    const isSelectedItemMenu = (subMenuList: any[]) => {
        return !!subMenuList.find((item) => item.selected);
    };

    const navMenuData = {
        stockItem: {
            label: pageNames.stocks,
            onClick: (isBlank) => setLocation(routerData[4].path, isBlank),
            selected:
                isSelectedItemSubMenu(routerData[4].path) ||
                isSelectedItemSubMenu(routerData[8].path) ||
                isSelectedItemSubMenu(routerData[9].path),
        },

        cashBackSubMenuList: [
            {
                id: 1,
                label: pageNames.products,
                onClick: (isBlank) => setLocation(routerData[5].path, isBlank),
                selected:
                    isSelectedItemSubMenu(routerData[5].path) ||
                    isSelectedItemSubMenu(routerData[10].path) ||
                    isSelectedItemSubMenu(routerData[11].path) ||
                    isSelectedItemSubMenu(routerData[12].path),
            },

            {
                id: 3,
                label: pageNames.categories,
                onClick: (isBlank) => setLocation(routerData[6].path, isBlank),
                selected:
                    isSelectedItemSubMenu(routerData[6].path) ||
                    isSelectedItemSubMenu(routerData[13].path) ||
                    isSelectedItemSubMenu(routerData[14].path),
            },

            {
                id: 4,
                label: pageNames.shops,
                onClick: (isBlank) => setLocation(routerData[7].path, isBlank),
                selected:
                    isSelectedItemSubMenu(routerData[7].path) ||
                    isSelectedItemSubMenu(routerData[15].path) ||
                    isSelectedItemSubMenu(routerData[16].path) ||
                    isSelectedItemSubMenu(routerData[17].path),
            },
        ],

        journalSubMenuList: [
            {
                id: 1,
                label: pageNames.chequeCorrection,
                onClick: (isBlank) => setLocation(routerData[18].path, isBlank),
                selected:
                    isSelectedItemSubMenu(routerData[18].path) ||
                    isSelectedItemSubMenu(routerData[22].path) ||
                    isSelectedItemSubMenu(routerData[23].path),
            },

            /*   {
                id: 5,
                label: pageNames.reviews,
                onClick: () => setLocation(routerData[16].path),
                selected:
                    isSelectedItemSubMenu(routerData[16].path) ||
                    isSelectedItemSubMenu(routerData[17].path) ||
                    isSelectedItemSubMenu(routerData[18].path),
            },*/
        ],

        checkChequeItem: {
            label: pageNames.checkCheque,
            onClick: (isBlank) => setLocation(routerData[24].path, isBlank),
            selected: isSelectedItemSubMenu(routerData[24].path),
        },
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
                    {authStore.isOnlyAdmin && (
                        <>
                            <ListItem
                                className={classNames(
                                    styles.listItem,
                                    navMenuData.stockItem.selected ? styles.selected : ''
                                )}
                            >
                                <ListItemButton
                                    labelBtn={isOpen ? navMenuData.stockItem.label : ''}
                                    classNameBtn={styles.itemSubMenuBtn}
                                    startIconBtn={<PercentIcon className={styles.itemIcon} />}
                                    handleClick={navMenuData.stockItem.onClick}
                                />
                            </ListItem>

                            <ListItem
                                className={classNames(
                                    styles.listItem,
                                    styles.itemSubMenu,
                                    isSelectedItemMenu(navMenuData.cashBackSubMenuList) ? styles.selected : ''
                                )}
                            >
                                <MenuAtom
                                    labelBtn={isOpen ? menuSectionNames.tkb : ''}
                                    classNameBtn={styles.itemSubMenuBtn}
                                    startIconBtn={<CashBackIcon className={styles.itemIcon} />}
                                    endIconBtn={isOpen ? <KeyboardArrowRightIcon className={styles.itemIcon} /> : null}
                                    data={navMenuData.cashBackSubMenuList}
                                />
                            </ListItem>

                            <ListItem
                                className={classNames(
                                    styles.listItem,
                                    styles.itemSubMenu,
                                    isSelectedItemMenu(navMenuData.journalSubMenuList) ? styles.selected : ''
                                )}
                            >
                                <MenuAtom
                                    labelBtn={isOpen ? menuSectionNames.journal : ''}
                                    classNameBtn={styles.itemSubMenuBtn}
                                    startIconBtn={<DescriptionOutlinedIcon className={styles.itemIcon} />}
                                    endIconBtn={isOpen ? <KeyboardArrowRightIcon className={styles.itemIcon} /> : null}
                                    data={navMenuData.journalSubMenuList}
                                />
                            </ListItem>
                        </>
                    )}

                    <ListItem
                        className={classNames(
                            styles.listItem,
                            navMenuData.checkChequeItem.selected ? styles.selected : ''
                        )}
                    >
                        <ListItemButton
                            labelBtn={isOpen ? navMenuData.checkChequeItem.label : ''}
                            classNameBtn={styles.itemSubMenuBtn}
                            startIconBtn={<FindInPageOutlinedIcon className={styles.itemIcon} />}
                            handleClick={navMenuData.checkChequeItem.onClick}
                        />
                    </ListItem>
                </List>

                <div className={styles.menuFooter}>
                    <div className={styles.fioContainer}>
                        <Slide in={isOpen} direction={'left'}>
                            <div className={!isOpen ? styles.hidden : ''}>
                                <div className={styles.fio}>
                                    {`${userInfo.firstName} ${userInfo.lastName} ${userInfo.patName}`}
                                </div>

                                <span className={styles.email}>{userInfo.email}</span>

                                <div className={styles.version}>{config.version}</div>
                            </div>
                        </Slide>

                        <IconButton className={styles.arrow} onClick={authStore.logout}>
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </div>
            </Drawer>
        </Box>
    );
});
