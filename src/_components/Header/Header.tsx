import styles from './Header.module.scss';
import { matchPath } from 'react-router-dom';
import {navigationRoutes} from "../../routes/routes";

export const HeaderComp = () => {
  const getNamePage = () => {
    const pageRout = navigationRoutes.find(item => matchPath(item.path, location.pathname));

    return pageRout ? pageRout.pageName : 'Неизвестная страница';
  }

  console.log('Render')

  return <div className={styles.headerComp}>{getNamePage()}</div>;
};
