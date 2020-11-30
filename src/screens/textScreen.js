import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const TextScreen = () => {
  const [name, setNamre] = useState("");

  return (
    <View>
      <Text>text1</Text>
      <TextInput
        value={name}
        onChangeText={newvalue => setNamre(newvalue)}
        style={styles.input}
      />
      <Text>my name is {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 15,
    padding: 15
  }
});

export default TextScreen;
