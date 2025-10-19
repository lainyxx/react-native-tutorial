import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoTask = {
  id: string;
  key: string;
  name: string;
  complete: boolean;
  date: string; // ISO形式
};

export default class TodoTaskService {
  /**
   * TodoタスクのIDを作成する
   *
   * @return {string}  タスクID
   * @memberof TodoTaskService
   */
  createTaskId() {
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += char[Math.floor(Math.random() * char.length)];
    }
    return result;
  }

  /**
   * Todoタスクを追加する
   *
   * @param {string} tabKey
   * @param {string} taskName
   * @memberof TodoTaskService
   */
  async addTask(tabKey: string, taskName: string) {
    const addTaskObj = {
      id: this.createTaskId(),
      key: tabKey,
      name: taskName,
      complete: false,
      date: new Date(),
    };

    try {
      let taskList = await this.getTaskList();
      taskList.push(addTaskObj);
      await AsyncStorage.setItem('@taskkey', JSON.stringify(taskList));
    } catch (e) {
      throw e;
    }
  }

  /**
   *  タスク一覧を取得
   *
   * @return {Promise<string>} タスク一覧（ストレージにタスク情報が存在しない場合は、空配列を返す）
   * @memberof TodoTabService
   */
  async getTaskList() {
    try {
      const jsonValue = await AsyncStorage.getItem('@taskkey');
      const jsonParse = jsonValue ? JSON.parse(jsonValue) : [];

      return jsonParse;
    } catch (e) {
      throw e;
    }
  }
}
