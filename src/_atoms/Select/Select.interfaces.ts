export interface IOptions {
  value: number | string;
  label: string;
  [key: string]: any;
}

export interface ISelectAtom {
  options: IOptions[];
  onChange: (value: string) => void;
  value: string;
  label?: string;
  isEmpty?: boolean;
  className?: string;
  disabled?: boolean;
}
