export interface IOptions {
    value: number | string;
    label: string;
    [key: string]: any;
}

export interface IMultiSelectChipAtom {
    options: IOptions[];
    value: any[];
    onChange: (value: string[] | number[]) => void;
    label?: string;
    className?: string;
    disabled?: boolean;
}

export interface ISelectAtom {
    options: IOptions[];
    onChange: (value: string | number) => void;
    value: string | number;
    label?: string;
    isEmpty?: boolean;
    className?: string;
    disabled?: boolean;
}
