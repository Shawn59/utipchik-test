import { HeaderComp, NavMenuComp } from '@components';
import styles from './MainLayout.module.scss';
import { AppRouters } from '../../routes/routes';

export const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className={styles.mainLayout}>
      <NavMenuComp />

      <div className={styles.page}>
        <HeaderComp />

        <div className={styles.content}>
          <AppRouters />
        </div>
      </div>
    </div>
  );
};
