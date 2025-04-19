import styles from './MediaCard.module.scss';
import { FC } from 'react';
import classNames from 'classnames';
import {
  CancelOutlined as CancelOutlinedIcon,
  UndoOutlined as UndoOutlinedIcon,
  CheckCircleOutlined as CheckCircleOutlinedIcon,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { TooltipAtom } from '../Tooltip/Tooltip';

interface IMediaCardAtom {
  data: {
    id: string;
    name: string;
    img: string;
    type: 'offline' | 'online' | 'text';
    duration?: string;
    size?: string;
    hashTags: string;
    screens: string;
    change: string;
    moderation: string;
    moderationStatus: 'success' | 'cancel' | 'return';
  };
}

export const MediaCardAtom: FC<IMediaCardAtom> = (props) => {
  const { data } = props;

  return (
    <div className={styles.mediaCardAtom}>
      <div className={styles.imgContainer}>
        <img src={data.img} className={styles.img} />

        {data.duration && <div className={styles.videoDuration}>{data.duration}</div>}

        {data.size && <div className={styles.videoSize}>{data.size}</div>}

        <div className={classNames(styles.videoType, styles[data.type])}>{data.type}</div>

        <div className={classNames(styles.moderationContainer, styles[data.moderationStatus])}>
          {data.moderationStatus === 'cancel' && (
            <TooltipAtom title="Статус модерации: - отказано" placement="top" arrow>
              <CancelOutlinedIcon className={styles.moderationIcon} />
            </TooltipAtom>
          )}
          {data.moderationStatus === 'success' && (
            <TooltipAtom title="Статус модерации: - одобрено" placement="top" arrow>
              <CheckCircleOutlinedIcon className={styles.moderationIcon} />
            </TooltipAtom>
          )}
          {data.moderationStatus === 'return' && (
            <TooltipAtom title="Статус модерации: - возвращено на доработку " placement="top" arrow>
              <UndoOutlinedIcon className={styles.moderationIcon} />
            </TooltipAtom>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.name}>{data.name}</div>

        <div className={styles.params}>
          {data.screens && <div className={styles.value}>{data.screens}</div>}
          {data.hashTags && <div className={styles.value}>{data.hashTags}</div>}
        </div>

        <div className={styles.footer}>
          <div className={styles.row}>
            <span className={styles.title}>{'Изменения:'}</span>
            <span className={styles.value}>{data.change}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.title}>{'Модерация:'}</span>
            <span className={styles.value}>{data.moderation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
