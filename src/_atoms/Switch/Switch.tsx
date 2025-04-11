import Switch from '@mui/material/Switch';
import { FC } from 'react';
import styles from './Switch.module.scss';

interface ISwitchAtom {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

export const SwitchAtom: FC<ISwitchAtom> = (props) => {
  const { checked, label, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={styles.switchAtom}>
      <div>{label}</div>

      <Switch checked={checked} onChange={handleChange} />
    </div>
  );
};
