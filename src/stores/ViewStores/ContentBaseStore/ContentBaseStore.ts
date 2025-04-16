import { rootStoreType } from '../../RootStore';
import { makeAutoObservable } from 'mobx';
import { getBaseContentMDAPI, getMediaSearchListAPI } from '@apiMoke';
import { IBreadcrumbsData } from '../../../_atoms/Breadcrumbs/Breadcrumbs.interfaces';
import { navigationRoutes } from '../../../routes/routes';

interface ISortData {
  key: string;
  value: 'asc' | 'desc';
}

export class ContentBaseStore {
  rootStore: rootStoreType;

  contentBaseData: any = null;
  mediaSearchList: any = null;

  selectedFastFilterId = 1;

  mediaCardNameKeyword = '';

  breadcrumbsList: IBreadcrumbsData[] = [
    {
      label: navigationRoutes[0].pageName,
    },
  ];

  sortFieldsList = [
    { key: 'name', title: 'По наименованию' },
    { key: 'periodTime', title: 'По длительности' },
    { key: 'date', title: 'По дате изменения' },
    { key: 'user', title: 'По пользователю' },
  ];

  sortData: ISortData = { key: 'date', value: 'asc' };

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    makeAutoObservable(this, { rootStore: false, breadcrumbsList: false, sortFieldsList: false });
  }

  clearData = () => {
    this.sortData = { key: 'date', value: 'asc' };
    this.selectedFastFilterId = 1;
  };

  setFieldSort = (key: string) => {
    if (this.sortData.key === key) {
      this.sortData.value = this.sortData.value === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortData.key = key;
      this.sortData.value = 'asc';
    }
  };

  setMediaCardNameKeyword = (value: string) => {
    this.mediaCardNameKeyword = value;
  };

  setSelectedFastFilterId = (value: number | string) => {
    this.selectedFastFilterId = value as number;
  };

  getBaseContentMD = () => {
    getBaseContentMDAPI().then((response) => {
      this.contentBaseData = response;
    });
  };

  getMediaSearchList = () => {
    getMediaSearchListAPI().then((response: any) => {
      this.mediaSearchList = response.elements.map((item) => {
        return { id: item.id, label: item.name };
      });
    });
  };
}
