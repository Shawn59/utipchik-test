import { rootStoreType } from '../RootStore';
import { makeAutoObservable } from 'mobx';
import { getBadeContentMDAPI } from '@apiMoke';

export class ContentBaseStore {
  rootStore: rootStoreType;

  contentBaseData: any = null;

  selectedFastFilterId = 0;

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    makeAutoObservable(this, { rootStore: false });
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
