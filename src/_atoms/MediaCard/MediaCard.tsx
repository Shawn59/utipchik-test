import styles from './MediaCard.module.scss';
import { FC } from 'react';

interface IMediaCardAtom {
  data: {
    id: string;
    name: string;
    img: string;
    duration: string;
  };
}

export const MediaCardAtom: FC<IMediaCardAtom> = (props) => {
  const { data } = props;
  return (
    <div className={styles.mediaCardAtom}>
      <div className={styles.imgContainer}>
        <img src={data.img} className={styles.img} />

        <div className={styles.videoDuration}>{data.duration}</div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.name}>{data.name}</div>
      </div>
    </div>
  );
};
