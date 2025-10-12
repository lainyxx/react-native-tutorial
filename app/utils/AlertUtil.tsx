import { Alert } from 'react-native';

export default class AlertUtil {
  /**
   *
   *
   * @static
   * @param {string} title
   * @param {string} message
   * @param {((input: string | undefined) => void)} onPress
   * @memberof AlertUtil
   */
  static showTextInputAlert(title: string, message: string, onPress: (input: string | undefined) => void) {
    Alert.prompt(title, message, [
      { text: 'キャンセル', style: 'cancel' },
      { text: 'OK', onPress: (text: string | undefined) => onPress(text) },
    ]);
  }
}
