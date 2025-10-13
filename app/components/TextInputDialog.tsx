import React from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type TextInputDialogProps = {
  visible: boolean;
  defaultValue?: string;
  title: string;
  description: string;
  placeholder?: string;
  maxLength: number;
  cancelCallback: () => void;
  okCallback: (text: string) => void | Promise<void>;
};

export default function TextInputDialog({
  visible,
  defaultValue = '',
  title,
  description,
  placeholder = '',
  maxLength,
  cancelCallback,
  okCallback,
}: TextInputDialogProps) {
  const [text, setText] = React.useState(defaultValue);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={cancelCallback}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            maxLength={maxLength}
            defaultValue={defaultValue}
            onChangeText={setText}
            autoFocus={Platform.OS === 'ios'}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={cancelCallback} style={styles.button}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => okCallback(text)} style={styles.button}>
              <Text style={styles.ok}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { color: '#333', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  button: { marginLeft: 10 },
  cancel: { color: '#888' },
  ok: { color: '#007AFF', fontWeight: 'bold' },
});
