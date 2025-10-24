import AsyncStorage from '@react-native-async-storage/async-storage';

export type TodoTask = {
  id: string;
  key: string;
  name: string;
  complete: boolean;
  date: string; // ISO形式
};

export default class TodoTaskService {
  TASK_KEY = '@taskKey';
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
      await AsyncStorage.setItem(this.TASK_KEY, JSON.stringify(taskList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todoタスクを編集する
   *
   * @param {string} taskId　編集するタスクのID
   * @param {string} editTaskName  編集するタスクのタスク名
   * @memberof TodoTaskService
   */
  async editTask(taskId: string, editTaskName: string) {
    try {
      const taskList = await this.getTaskList();
      const editTaskObj = taskList.filter((taskObj: TodoTask) => taskObj.id == taskId)[0];
      editTaskObj.name = editTaskName;
      const updateTaskList = taskList.map((taskObj: TodoTask) => (taskObj.id == taskId ? editTaskObj : taskObj));

      await AsyncStorage.setItem(this.TASK_KEY, JSON.stringify(updateTaskList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Todoタスクを削除する
   *
   * @param {string} taskId 削除するタスクのID
   * @memberof TodoTaskService
   */
  async deleteTask(taskId: string) {
    try {
      const taskList = await this.getTaskList();
      const updateTaskList = taskList.filter((taskObj: TodoTask) => taskObj.id != taskId);

      await AsyncStorage.setItem(this.TASK_KEY, JSON.stringify(updateTaskList));
    } catch (e) {
      throw e;
    }
  }

  /**
   * 指定したタブのタスクを削除する
   *
   * @param {string} tabKey　タブキー
   * @memberof TodoTaskService
   */
  async deleteTaskTargetTabKey(tabKey: string) {
    try {
      const taskList = await this.getTaskList();
      const updateTaskList = taskList.filter((taskObj: TodoTask) => taskObj.key != tabKey);
      await AsyncStorage.setItem(this.TASK_KEY, JSON.stringify(updateTaskList));
    } catch (e) {
      throw e;
    }
  }

  /**
   *　Todoタスクチェック
   *
   * @param {string} taskId タスクID
   * @param {boolean} complete  タスク完了フラグ
   * @memberof TodoTaskService
   */
  async checkTask(taskId: string, complete: boolean) {
    try {
      const taskList = await this.getTaskList();
      const editTaskObj = taskList.filter((taskObj: TodoTask) => taskObj.id == taskId)[0];
      editTaskObj.complete = complete;
      const updateTaskList = taskList.map((taskObj: TodoTask) => (taskObj.id == taskId ? editTaskObj : taskObj));

      await AsyncStorage.setItem(this.TASK_KEY, JSON.stringify(updateTaskList));
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
      const jsonValue = await AsyncStorage.getItem(this.TASK_KEY);
      const jsonParse = jsonValue ? JSON.parse(jsonValue) : [];

      return jsonParse;
    } catch (e) {
      throw e;
    }
  }
}
