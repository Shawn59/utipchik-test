import React, { useContext } from 'react';
import { AppContext } from '../../context';

export const useStoresHook = () => {
    return useContext(AppContext);
};
