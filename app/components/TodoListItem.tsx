import { StyleSheet } from 'react-native';
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
 * @param {string} todoTitle - TODOタイトル
 * @return {TodoListItem}
 */
export default function TodoListItem({ todoTitle }: { todoTitle: string }) {
  /**
   *  ボタン押下イベント
   *
   * @param {number} btnId　- ボタンID　0:削除
   */
  const btnTapped = (btnId: number) => {
    if (btnId === 0) {
      // 削除処理を実行
    }
  };

  return (
    <SwipeableRow onPress={btnTapped}>
      <ListItem topDivider style={{ width: '100%' }}>
        <ListItem.Content style={styles.ListItem}>
          <Checkmark complete={true}></Checkmark>
          <ListItem.Title style={styles.ListItemTitle}>{`${todoTitle}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </SwipeableRow>
  );
}
