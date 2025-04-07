import styles from './PageContentLayout.module.scss'

export const PageContentLayout = (props) => {
  const { Header, Content } = props;

  return (
    <div className={styles.pageContentLayout}>
      <div className={styles.headerContainer}>{Header}</div>

      <div className={styles.contentContainer}>{Content}</div>
    </div>
  );
};