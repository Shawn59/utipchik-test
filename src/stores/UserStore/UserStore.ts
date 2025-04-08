import { rootStoreType } from '../RootStore';
import { makeAutoObservable } from 'mobx';

export class UserStore {
  rootStore: rootStoreType;

  userInfo: any = null;

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    this.userInfo = {
      fio: 'Специальный П.Н.',
      role: 'Админ',
    };

    makeAutoObservable(this, { rootStore: false });
  }
}