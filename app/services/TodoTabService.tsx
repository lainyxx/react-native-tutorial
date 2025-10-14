import AsyncStorage from '@react-native-async-storage/async-storage';

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

    console.log('addTab: ', AsyncStorage.getItem('@tabkey'));
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
