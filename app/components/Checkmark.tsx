import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  checkmark: {
    width: 28,
    height: 28,
  },
});

/**
 * チェックマーク
 *
 * @export
 * @param {boolean} complete  タスク完了フラグ
 * @param {(complete: boolean) => void} onPress　チェックマーク押下処理
 * @return {Checkmark}
 */

export default function Checkmark({ complete, onPress }: { complete: boolean; onPress: (complete: boolean) => void }) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(complete)}>
      {/* チェック */}
      {complete == true && <Image source={require('../../assets/images/checkmark.png')} style={styles.checkmark} />}

      {/* 未チェック */}
      {complete == false && <Image source={require('../../assets/images/un_checkmark.png')} style={styles.checkmark} />}
    </TouchableOpacity>
  );
}
