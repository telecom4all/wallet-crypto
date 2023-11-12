
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ style, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        {...props}  // This allows us to pass any TextInput prop to this component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default Input;
