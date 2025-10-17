import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoTab = {
  key: string;
  name: string;
  date: string; // ISO形式
};

export default class TodoTabService {
  /**
   * Todoタブのキーを作成する
   *
   * @return {*}
   * @memberof TodoTabService
   */
  createTabKey() {
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += char[Math.floor(Math.random() * char.length)];
    }
    return result;
  }

  /**
   * Todoタブを追加する
   *
   * @param {string} tabName
   * @memberof TodoTabService
   */
  async addTab(tabName: string) {
    const addTabObj = {
      key: this.createTabKey(),
      name: tabName,
      date: new Date(),
    };

    try {
      let tabList = await this.getTabList();
      tabList.push(addTabObj);
      await AsyncStorage.setItem('@tabkey', JSON.stringify(tabList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todoタブを編集する
   *
   * @param {string} editTabKey　編集するタブのキー
   * @param {string} editTabName  編集するタブのタブ名
   * @memberof TodoTabService
   */
  async editTab(editTabKey: string, editTabName: string) {
    try {
      const tabList = await this.getTabList();
      const editTabObj = tabList.filter((tabObj: TodoTab) => tabObj.key == editTabKey)[0];
      editTabObj.name = editTabName;
      const updateTabList = tabList.map((tabObj: TodoTab) => (tabObj.key == editTabKey ? editTabObj : tabObj));

      await AsyncStorage.setItem('@tabkey', JSON.stringify(updateTabList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todoタブを削除する
   *
   * @param {string} tabKey 削除するタブのキー
   * @memberof TodoTabService
   */
  async deleteTab(tabKey: string) {
    try {
      // タブを削除
      const tabList = await this.getTabList();
      const updateTabList = tabList.filter((tabObj: TodoTab) => tabObj.key != tabKey);

      await AsyncStorage.setItem('@tabkey', JSON.stringify(updateTabList));

      // タブに紐づくタスクを削除
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todo一覧を取得
   *
   * @return {Promise<string>} タブ一覧（ストレージにタブ情報が存在しない場合は、空配列を返す）
   * @memberof TodoTabService
   */
  async getTabList() {
    try {
      const jsonValue = await AsyncStorage.getItem('@tabkey');
      const jsonParse = jsonValue ? JSON.parse(jsonValue) : [];

      return jsonParse;
    } catch (e) {
      throw e;
    }
  }
}
