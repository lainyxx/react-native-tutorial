import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TabContext } from './contexts/TabContext';
import HomeStack from './navigations/stack/HomeStack';

export default function RootNavigation() {
  const [tabReload, setTabReload] = React.useState(false);
  return (
    <TabContext.Provider
      value={{
        tabReload: { get: tabReload, set: setTabReload },
      }}>
      <GestureHandlerRootView>
        <HomeStack />
      </GestureHandlerRootView>
    </TabContext.Provider>
  );
}
