export interface IBreadcrumbsData {
    label: string;
    href?: string;
}

export interface IBreadcrumbsAtom {
    data: IBreadcrumbsData[];
}
