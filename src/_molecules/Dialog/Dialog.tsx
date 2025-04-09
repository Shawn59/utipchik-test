import React, { FC, JSX } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Dialog.module.scss';
import { Divider, IconButton } from '@mui/material';
import { ButtonAtom } from '@atoms';
import classNames from 'classnames';

export interface IDialogComp {
  isOpen: boolean;
  onClose: () => void;
  dialogContent: JSX.Element | React.ReactNode;
  onSubmit?: () => void;
  dialogAction?: JSX.Element;
  title?: string;
  labelSubmitBtn?: string;
  isCloseBtn?: boolean;
  labelCloseBtn?: string;
  className?: string;
  submitBtnProps?: Record<string, any>;
}

export const DialogComp: FC<IDialogComp> = (props) => {
  const {
    isOpen,
    onClose,
    title = 'Заголовок',
    labelSubmitBtn = 'Добавить',
    onSubmit,
    dialogContent,
    dialogAction,
    isCloseBtn,
    labelCloseBtn = 'Нет',
    className,
    submitBtnProps,
  } = props;

  return (
    <Dialog onClose={onClose} open={isOpen} className={classNames(styles.dialogCompContainer, className)}>
      <DialogTitle className={styles.dialogTitle}>
        <div className={styles.title}>{title}</div>

        <IconButton onClick={onClose}>
          <CloseIcon className={styles.closeIcon} />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent className={styles.dialogContent}>{dialogContent}</DialogContent>

      <DialogActions className={styles.dialogActions}>
        {!dialogAction ? (
          <>
            {isCloseBtn && (
              <ButtonAtom className={styles.submitBtn} label={labelCloseBtn} onClick={onClose} theme={'Ternary'} />
            )}
            <ButtonAtom className={styles.submitBtn} label={labelSubmitBtn} onClick={onSubmit} {...submitBtnProps} />
          </>
        ) : (
          dialogAction
        )}
      </DialogActions>
    </Dialog>
  );
};
