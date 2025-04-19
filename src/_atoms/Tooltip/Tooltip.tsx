import { PopperProps, Tooltip } from '@mui/material';
import React, { FC } from 'react';

interface ITooltipAtom {
  title: string;
  children: React.ReactElement<unknown, any>;
  placement?: PopperProps['placement'];
  isArrow?: boolean;
}

export const TooltipAtom: FC<ITooltipAtom> = (props) => {
  const { title, placement, isArrow = false, children } = props;

  return (
    <Tooltip title={title} placement={placement || 'top'} arrow={isArrow}>
      {children}
    </Tooltip>
  );
};