import styles from './PreloaderFullContent.module.scss';
import { PreloaderAtom } from '@atoms';

export const PreloaderFullContentMol = () => {
  return (
    <div className={styles.preloaderFullContent}>
      <PreloaderAtom />
    </div>
  );
};
