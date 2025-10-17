import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwipeableRow from './SwipeableRow';

const styles = StyleSheet.create({
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ListItemTitle: {
    flex: 1,
  },
});

/**
 *  Tabリストアイテム
 *
 * @export
 * @param {string} todoTitle - Tabタイトル
 * @param {string} tabKey - Tabキー
 * @param {(tabkey: stirng, todoTitle: string) => void} listItemTapped - リストタップ時の処理
 * @param {(tabkey: stirng) => void} deleteBtnTapped - 削除ボタンタップ時の処理
 * @return {TabListItem}
 */
export default function TabListItem({
  tabTitle,
  tabKey,
  listItemTapped,
  deleteBtnTapped,
}: {
  tabTitle: string;
  tabKey: string;
  listItemTapped: (tabKey: string, tabTitle: string) => void;
  deleteBtnTapped: (tabKey: string) => void;
}) {
  /**
   *  ボタン押下イベント
   *
   * @param {number} btnId　- ボタンID　0:削除
   */
  const btnTapped = (btnId: number) => {
    if (btnId === 0) {
      // 削除処理を実行
      deleteBtnTapped(tabKey);
    }
  };

  return (
    <SwipeableRow onPress={btnTapped}>
      <TouchableOpacity onPress={() => listItemTapped(tabKey, tabTitle)} activeOpacity={1}>
        <ListItem topDivider style={{ width: '100%' }}>
          <ListItem.Content style={styles.ListItem}>
            <ListItem.Title style={styles.ListItemTitle}>{`${tabTitle}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </SwipeableRow>
  );
}
