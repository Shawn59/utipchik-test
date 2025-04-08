import { rootStoreType } from '../../RootStore';
import { makeAutoObservable } from 'mobx';
import { getBaseContentMDAPI, getMediaSearchListAPI } from '@apiMoke';
import {IBreadcrumbsData} from "../../../_atoms/Breadcrumbs/Breadcrumbs.interfaces";
import {navigationRoutes} from "../../../routes/routes";

export class ContentBaseStore {
  rootStore: rootStoreType;

  contentBaseData: any = null;
  mediaSearchList: any = null;

  selectedFastFilterId = 0;

  breadcrumbsList: IBreadcrumbsData[] = [
    {
      label: navigationRoutes[0].pageName,
    },
  ];

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    makeAutoObservable(this, { rootStore: false, breadcrumbsList: false });
  }

  setSelectedFastFilterId = (value: number) => {
    this.selectedFastFilterId = value;
  };

  getBaseContentMD = () => {
    getBaseContentMDAPI().then((response) => {
      this.contentBaseData = response;
    });
  };

  getMediaSearchList = (_keywords: string) => {

    getMediaSearchListAPI().then((response: any) => {
      this.mediaSearchList = response.elements.map(item => {return {id: item.id, label: item.name}});
    });
  };
}
