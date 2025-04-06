import React, { FC } from 'react';
import styles from './Preloader.module.scss';
import classNames from 'classnames';

interface IPreloader {
  className?: string;
}

export const PreloaderAtom: FC<IPreloader> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(styles.preloaderContainer, className)}>
      <div className={classNames(styles.circle, styles.first, styles.accent)}></div>
      <div className={classNames(styles.circle, styles.second, styles.accent)}></div>
      <div className={classNames(styles.circle, styles.third, styles.accent)}></div>
      <div className={classNames(styles.circle, styles.fourth, styles.accent)}></div>
    </div>
  );
};
