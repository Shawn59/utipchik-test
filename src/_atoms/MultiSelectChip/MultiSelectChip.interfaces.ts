import { IOptions } from '../Select/Select.interfaces';

export interface IMultiSelectChipAtom {
  options: IOptions[];
  value: any[];
  onChange: (value: string[] | number[]) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}
