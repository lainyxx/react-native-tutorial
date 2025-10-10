import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeStack from './navigations/stack/HomeStack';

export default function RootNavigation() {
  return (
    <GestureHandlerRootView>
      <HomeStack />
    </GestureHandlerRootView>
  );
}
