import { NavMenuComp } from '@components';
import styles from './MainLayout.module.scss';
import { AppRouters } from '../../routes/routes';
import { observer } from 'mobx-react-lite';

export const MainLayout = observer(() => {
  return (
    <div className={styles.mainLayout}>
      <NavMenuComp />

      <AppRouters />
    </div>
  );
});
