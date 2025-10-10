import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

type SwipeableRowProps = {
  onPress: (btnId: number) => void;
  children: any;
};

export default function SwipeableRow({ onPress, children }: SwipeableRowProps) {
  const ref = React.useRef<Swipeable>(null);

  // 型を any にしてエラーを回避
  const renderRightActions = (progress: any, _dragAnimatedValue: any) => (
    <View style={{ width: 120, flexDirection: 'row' }}>{renderRightAction(0, '削除', '#dd2c00', 40, progress)}</View>
  );

  const renderRightAction = (btnId: number, text: string, color: string, x: number, progress: any) => {
    const trans = progress.interpolate
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: [x, 0],
        })
      : x;
    const pressHandler = () => {
      ref?.current?.close();
      onPress(btnId);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <Swipeable ref={ref} renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}
