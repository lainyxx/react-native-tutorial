import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import FloatingButton from '../components/FloatingButton';
import TextInputDialog from '../components/TextInputDialog';
import TodoListItem from '../components/TodoListItem';
import { TabContext, TabContextType } from '../contexts/TabContext';
import TodoTabService, { TodoTab } from '../services/TodoTabService';
import TodoTaskService from '../services/TodoTaskService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});

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

let selectedTabKey = '';

export default function HomeScreen({ navigation }: any) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState<{ key: string; title: string }[]>([]);

  const [tabList, setTabList] = React.useState<TodoTab[]>([]);

  const [visibleAddTodoAlert, setVisibleAddTodoAlert] = React.useState(false);

  const tabContext = React.useContext(TabContext) as TabContextType;

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

  React.useEffect(() => {
    (async function () {
      try {
        const todoTabService = new TodoTabService();
        const storageTabList = await todoTabService.getTabList();

        setTabList(storageTabList);

        selectedTabKey = storageTabList.length ? storageTabList[0].key : '';
      } catch (e) {
        setTabList([]);
        selectedTabKey = '';
      }
    })();
  }, []);

  // タブ更新時に実行
  React.useEffect(() => {
    if (tabContext.tabReload.get) {
      (async function () {
        try {
          const todoTabService = new TodoTabService();
          const storageTabList = await todoTabService.getTabList();

          setTabList(storageTabList);
        } catch (e) {
          setTabList([]);
        } finally {
          tabContext.tabReload.set(false);
        }
      })();
    }
  }, [tabContext.tabReload]);

  // タブ一覧更新時に実行
  React.useEffect(() => {
    const tabListRoutes = tabList.map((tabObj) => {
      return { key: tabObj.key, title: tabObj.name };
    });

    setRoutes(tabListRoutes);

    // タブ更新前に選択されていたタブを選択する
    const selectedTabIndex = tabList.findIndex((tabObj) => tabObj.key == selectedTabKey);
    0 <= selectedTabIndex ? setIndex(selectedTabIndex) : setIndex(0);

    selectedTabKey = tabList.length ? (0 <= selectedTabIndex ? tabList[selectedTabIndex].key : tabList[0].key) : '';
    console.log(selectedTabKey);
  }, [tabList]);

  /**
   * タスク追加処理
   *
   * @param {string} taskName 追加するタスク名
   */
  async function addTask(taskName: string) {
    try {
      const todoTaskService = new TodoTaskService();
      await todoTaskService.addTask(selectedTabKey, taskName);

      // const storageTaskList = await todoTaskService.getTabList();
      // setTabList(storageTaskList);
    } catch (e) {
      Alert.alert('エラー', 'Todoの追加に失敗しました', [{ text: 'OK' }]);
    }
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
      {0 < routes.length && (
        <>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(index: number) => {
              selectedTabKey = tabList[index].key;
              console.log(selectedTabKey);
              setIndex(index);
            }}
            initialLayout={{ width: layout.width }}
          />
          <FloatingButton onPress={() => setVisibleAddTodoAlert(true)}></FloatingButton>
          <TextInputDialog
            visible={visibleAddTodoAlert}
            title={'TODO追加'}
            description={'TODOタイトルを入力してください'}
            placeholder={'50文字以内'}
            maxLength={50}
            cancelCallback={() => setVisibleAddTodoAlert(false)}
            okCallback={async (text) => {
              await addTask(text);
              setVisibleAddTodoAlert(false);
            }}></TextInputDialog>
        </>
      )}
      <StatusBar style="light" />
    </View>
  );
}
