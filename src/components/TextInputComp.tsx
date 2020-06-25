import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { InputProps } from "../types/types";

const TextInputComp: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name={props.icon} size={30} color={"white"} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 45,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 25,
    width: "100%",
    flex: 6,
  },
  icon: {
    flex: 1,
    marginLeft: 15,
  },
});

export default TextInputComp;
