import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import FloatingButton from '../components/FloatingButton';
import TodoListItem from '../components/TodoListItem';
import AlertUtil from '../utils/AlertUtil';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Todo1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Todo2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Todo3',
  },
];

export default function HomeScreen({ navigation }: any) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tab1', title: 'タブ1' },
    { key: 'tab2', title: 'タブ2' },
    { key: 'tab3', title: 'タブ3' },
    { key: 'tab4', title: 'タブ4' },
    { key: 'tab5', title: 'タブ5' },
  ]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Tab')}>
            <Icon name="folder" color={'white'} size={25}></Icon>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  /**
   * Todo追加アラートを表示する
   *
   */
  function showAddTodoAlert() {
    AlertUtil.showTextInputAlert('TODO追加', 'TODOタイトルを入力してください', (text) => {
      console.log(text);
    });
  }

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      default:
        return (
          <FlatList
            data={DATA}
            renderItem={({ item }) => {
              return <TodoListItem todoTitle={item.title}></TodoListItem>;
            }}
            keyExtractor={(item) => item.id}
          />
        );
    }
  };

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        activeColor="#167476"
        inactiveColor="#505050"
        style={{ backgroundColor: 'white' }}
        tabStyle={{ width: 'auto', minWidth: 100 }}
        labelStyle={{ color: 'black', fontWeight: 'bold' }}
        indicatorStyle={{ borderBottomWidth: 2, borderColor: '#6B7076' }}
        scrollEnabled={true}
        pressOpacity={1}></TabBar>
    );
  };

  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <FloatingButton onPress={showAddTodoAlert}></FloatingButton>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
