import React from 'react';

export type TabContextType = {
  tabReload: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const TabContext = React.createContext<TabContextType | undefined>(undefined);
