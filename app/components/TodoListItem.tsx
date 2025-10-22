import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Checkmark from './Checkmark';
import SwipeableRow from './SwipeableRow';

const styles = StyleSheet.create({
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ListItemTitle: {
    flex: 1,
    marginLeft: 10,
  },
});

/**
 *  TODOリストアイテム
 *
 * @export
 * @param {string} taskId -  TODOタスクID
 * @param {string} todoTitle - TODOタイトル
 * @param {boolean} complete - TODOタスク完了フラグ
 * @param {(taskId: string, todoTitle: string) => void} listItemTapped - リストタップ時の処理
 * @param {(taskId: string) => void} deleteBtnTapped - 削除ボタン押下時の処理
 * @param {(taskId: string, complete: boolean) => void} checkmarkTapped - チェックマーク押下時の処理
 * @return {TodoListItem}
 */
export default function TodoListItem({
  complete,
  taskId,
  todoTitle,
  checkmarkTapped,
  listItemTapped,
  deleteBtnTapped,
}: {
  complete: boolean;
  taskId: string;
  todoTitle: string;
  checkmarkTapped: (taskId: string, complete: boolean) => void;
  listItemTapped: (taskId: string, tabTitle: string) => void;
  deleteBtnTapped: (taskIs: string) => void;
}) {
  /**
   *  ボタン押下イベント
   *
   * @param {number} btnId　- ボタンID　0:削除
   */
  const btnTapped = (btnId: number) => {
    if (btnId === 0) {
      // 削除処理を実行
      deleteBtnTapped(taskId);
    }
  };

  return (
    <SwipeableRow onPress={btnTapped}>
      <TouchableOpacity onPress={() => listItemTapped(taskId, todoTitle)} activeOpacity={1}>
        <ListItem topDivider style={{ width: '100%' }}>
          <ListItem.Content style={styles.ListItem}>
            <Checkmark complete={complete} onPress={(complete) => checkmarkTapped(taskId, complete)}></Checkmark>
            <ListItem.Title style={styles.ListItemTitle}>{`${todoTitle}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </SwipeableRow>
  );
}
