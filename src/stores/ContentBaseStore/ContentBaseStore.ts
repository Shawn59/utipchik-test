import {rootStoreType} from '../RootStore';
import { makeAutoObservable } from 'mobx';

export class BaseContentStore {
  rootStore: rootStoreType;

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    makeAutoObservable(this, { rootStore: false });
  }
}