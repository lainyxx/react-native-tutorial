import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#167476',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    right: 30,
    bottom: 60,
  },
});

/**
 *  FloatingButton
 *
 * @export
 * @param {() => void} onPress - 押下時イベント
 * @return {FloatingButton}
 */
export default function FloatingButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="plus" size={25} color={'white'}></Icon>
    </TouchableOpacity>
  );
}
