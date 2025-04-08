import { ContentBaseStore } from './ViewStores/ContentBaseStore/ContentBaseStore';
import {UserStore} from "./UserStore/UserStore";

class RootStore {
  stores = {
    contentBaseStore: new ContentBaseStore(this),
    userStore: new UserStore(this),
  };
}

const rootStore = new RootStore();

export type rootStoreType = typeof rootStore;
export type storesType = typeof rootStore.stores;

export default rootStore;
