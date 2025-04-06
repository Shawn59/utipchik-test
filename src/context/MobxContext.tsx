import { createContext } from 'react';
import { storesType } from '../stores/RootStore';

export const MobxContext = createContext<storesType | null>(null);
