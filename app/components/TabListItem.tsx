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
 * @return {TabListItem}
 */
export default function TabListItem({ tabTitle }: { tabTitle: string }) {
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
      <TouchableOpacity activeOpacity={1}>
        <ListItem topDivider style={{ width: '100%' }}>
          <ListItem.Content style={styles.ListItem}>
            <ListItem.Title style={styles.ListItemTitle}>{`${tabTitle}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </SwipeableRow>
  );
}
