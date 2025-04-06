import { ContentBaseStore } from './ContentBaseStore/ContentBaseStore';

class RootStore {
  stores = {
    contentBaseStore: new ContentBaseStore(this),
  };
}

const rootStore = new RootStore();

export type rootStoreType = typeof rootStore;
export type storesType = typeof rootStore.stores;

export default rootStore;
