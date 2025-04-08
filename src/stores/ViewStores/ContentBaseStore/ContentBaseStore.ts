import { rootStoreType } from '../RootStore';
import { makeAutoObservable } from 'mobx';
import { getBadeContentMDAPI } from '@apiMoke';
import {IBreadcrumbsData} from "../../_atoms/Breadcrumbs/Breadcrumbs.interfaces";
import {navigationRoutes} from "../../routes/routes";

export class ContentBaseStore {
  rootStore: rootStoreType;

  contentBaseData: any = null;

  selectedFastFilterId = 0;

  breadcrumbsList: IBreadcrumbsData[] = [
    {
      label: navigationRoutes[0].pageName,
    },
    {
      label: 'Тестовая ссылка на типа дочернию страницу',
      href: navigationRoutes[1].path
    },
  ];

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    makeAutoObservable(this, { rootStore: false, breadcrumbsList: false });
  }

  setSelectedFastFilterId = (value: number) => {
    this.selectedFastFilterId = value;
  };

  getBadeContentMD = () => {
    getBadeContentMDAPI().then((response) => {
      this.contentBaseData = response;
    });
  };
}
