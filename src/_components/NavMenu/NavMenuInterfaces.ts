import {JSX} from "react";
import {SvgIconComponent} from "@mui/icons-material";

export interface INavMenuComp {}

export interface INavMenuData {
    id: number,
    path: string,
    label: string,
    onClick: () => void,
    IconElem: SvgIconComponent,
}

export interface IListItemButton {
    startIconBtn: JSX.Element;
    endIconBtn?: JSX.Element;
    labelBtn?: string;
    onClick: (isBlank?: boolean) => void;
}