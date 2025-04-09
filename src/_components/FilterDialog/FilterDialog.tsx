import React, { FC, JSX } from 'react';
import { DialogComp } from '@molecules';
import { ButtonAtom } from '@atoms';
import { useOpenHook } from '@hooks';
import { FilterAltOutlined as FilterAltOutlinedIcon } from '@mui/icons-material';
import styles from './FilterDialog.module.scss';

export interface IFilterComp {
  title?: string;
  disabledBtn?: boolean;
  isActiveFilter?: boolean;
  onSubmit: () => void;
  onClear: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  children: JSX.Element;
}

export const FilterComp: FC<IFilterComp> = (props) => {
  const { children, title = 'Фильтр', onSubmit, onClear, disabledBtn, isActiveFilter, onClose, onOpen } = props;

  const { isOpen, handleClose, handleOpen } = useOpenHook();

  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }

    handleClose();
  };

  const handleOnOpen = () => {
    if (onOpen) {
      onOpen();
    }

    handleOpen();
  };

  return (
    <div className={styles.filterComContainer}>
      <ButtonAtom
        className={styles.filterBtn}
        onClick={handleOnOpen}
        theme={isActiveFilter ? 'Primary' : 'Secondary'}
        startIcon={(<FilterAltOutlinedIcon />) as React.ReactElement}
        size={'small'}
      />

      <DialogComp
        className={styles.filterDialog}
        isOpen={isOpen}
        title={title}
        onClose={handleOnClose}
        dialogContent={children}
        dialogAction={
          <>
            <ButtonAtom label={'Сбросить'} theme={'Ternary'} onClick={onClear} disabled={disabledBtn} />

            <ButtonAtom label={'Применить'} onClick={handleSubmit} disabled={disabledBtn} />
          </>
        }
      />
    </div>
  );
};
