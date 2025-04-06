import { useContext } from 'react';
import { MobxContext } from '../../context';
import { storesType } from '../../stores/RootStore';

export const useStoresHook = () => {
  return useContext(MobxContext) as storesType;
};
