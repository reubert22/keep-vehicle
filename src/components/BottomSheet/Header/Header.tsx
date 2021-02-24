import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../utils/Colors';

export const Header: FC = () => (
  <View style={styles.container}>
    <View style={styles.content} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 30,
    backgroundColor: Colors.grey,
    height: 6,
    borderRadius: 100,
  },
});
