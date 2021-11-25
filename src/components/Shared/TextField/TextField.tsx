import React, { FC } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../../utils/Colors';

type TextFieldProps = {
  label?: string;
  onChangeText: (text: string) => void;
  error?: { message: string };
  inputProps: TextInputProps;
};

export const TextField: FC<TextFieldProps> = ({ label, onChangeText, error, inputProps }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label || ''}</Text>
    <View style={styles.containerInput}>
      <TextInput style={styles.input} {...inputProps} onChangeText={onChangeText} />
    </View>
    <Text style={styles.errorMessage}>{!!error && error.message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: { color: Colors.primaryWhite, paddingLeft: 10 },
  containerInput: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.quaternaryBlue,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 40,
    width: '100%',
    color: Colors.white,
  },
  errorMessage: {
    fontSize: 12,
    paddingRight: 10,
    color: Colors.danger,
    alignSelf: 'flex-end',
  },
});
