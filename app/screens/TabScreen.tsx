import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabListItem from '../components/TabListItem';
import TextInputDialog from '../components/TextInputDialog';
import { TabContext, TabContextType } from '../contexts/TabContext';
import TodoTabService, { TodoTab } from '../services/TodoTabService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});

let selectedEditTabKey = '';
let selectedEditTabName = '';

export default function TabScreen({ navigation }: any) {
  const [tabList, setTabList] = React.useState<TodoTab[]>([]);
  const [visibleAddTabAlert, setVisibleAddTabAlert] = React.useState(false);
  const [visibleEditTabAlert, setVisibleEditTabAlert] = React.useState(false);

  const tabContext = React.useContext(TabContext) as TabContextType;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => setVisibleAddTabAlert(true)}>
            <Icon name="plus" color={'white'} size={25}></Icon>
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
      } catch (e) {
        setTabList([]);
      }
    })();
  }, []);

  /**
   * タブ編集ダイアログ表示処理
   *
   * @param {string} editTabKey
   * @param {string} editTabName
   */
  function showEditTodoAlert(editTabKey: string, editTabName: string) {
    selectedEditTabKey = editTabKey;
    selectedEditTabName = editTabName;

    setVisibleEditTabAlert(true);
  }

  /**
   * タブ追加処理
   *
   * @param {string} tabName 追加するタブ名
   */
  async function addTab(tabName: string) {
    try {
      const todoTabService = new TodoTabService();
      await todoTabService.addTab(tabName);
      const storageTabList = await todoTabService.getTabList();

      setTabList(storageTabList);

      tabContext.tabReload.set(true);
    } catch (e) {
      Alert.alert('エラー', 'タブの追加に失敗しました', [{ text: 'OK' }]);
    }
  }

  /**
   * タブ編集処理
   *
   * @param {string} tabName　編集後のタブ名
   */
  async function editTab(tabName: string) {
    try {
      const todoTabService = new TodoTabService();
      await todoTabService.editTab(selectedEditTabKey, tabName);

      const storageTabList = await todoTabService.getTabList();
      setTabList(storageTabList);

      tabContext.tabReload.set(true);
    } catch (e) {
      Alert.alert('エラー', 'タブの編集に失敗しました', [{ text: 'OK' }]);
    }

    selectedEditTabKey = '';
    selectedEditTabName = '';
  }

  /**
   * タブ削除処理
   *
   * @param {string} tabKey 削除するタブのキー
   */
  async function deleteTab(tabKey: string) {
    try {
      const todoTabService = new TodoTabService();
      await todoTabService.deleteTab(tabKey);

      const storageTabList = await todoTabService.getTabList();
      setTabList(storageTabList);

      tabContext.tabReload.set(true);
    } catch (e) {
      Alert.alert('エラー', 'タブの削除に失敗しました', [{ text: 'OK' }]);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingTop: 30 }}
        data={tabList}
        renderItem={({ item }) => {
          return <TabListItem tabKey={item.key} tabTitle={item.name} listItemTapped={showEditTodoAlert} deleteBtnTapped={deleteTab}></TabListItem>;
        }}
        keyExtractor={(item) => item.key}
      />

      <TextInputDialog
        visible={visibleAddTabAlert}
        title={'タブ追加'}
        description={'追加するタブ名を入力してください'}
        placeholder={'20文字以内'}
        maxLength={20}
        cancelCallback={() => setVisibleAddTabAlert(false)}
        okCallback={async (text) => {
          await addTab(text);
          setVisibleAddTabAlert(false);
        }}></TextInputDialog>

      <TextInputDialog
        visible={visibleEditTabAlert}
        defaultValue={selectedEditTabName}
        title={'タブ編集'}
        description={'編集するタブ名を入力してください'}
        placeholder={'20文字以内'}
        maxLength={20}
        cancelCallback={() => setVisibleEditTabAlert(false)}
        okCallback={async (text) => {
          await editTab(text);
          setVisibleEditTabAlert(false);
        }}></TextInputDialog>

      <StatusBar style="light" />
    </View>
  );
}
