import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import axios from "axios";
import TextInputComp from "../components/TextInputComp";
import { dataCollected } from "../types/types";
const colors = require("../../colors.json");

const SignUpScreen: React.FC = ({ navigation }) => {
  const [response, setResponse] = useState<string>("");
  const [data, setData] = useState<dataCollected>({
    email: "",
    name: "",
    password: "",
  });

  const handleConfirm = async (): Promise<any> => {
    try {
      await axios.post("https://notebook-23.herokuapp.com/api/users/add", data);
      setResponse("User Created");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1500);
    } catch (err) {
      setResponse(err.response.data);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/HomeScreen.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInputComp
          placeholder={"Name"}
          icon={"ios-person"}
          onChangeText={(res) => {
            setData({ ...data, name: res });
          }}
        />
        <TextInputComp
          icon={"ios-mail"}
          placeholder={"Email"}
          keyboardType={"email-address"}
          onChangeText={(res) => {
            setData({ ...data, email: res });
          }}
        />
        <TextInputComp
          icon={"ios-key"}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={(res) => {
            setData({ ...data, password: res });
          }}
        />
        <Text onPress={() => handleConfirm()} style={styles.confirmButton}>
          Confirm
        </Text>
        <Text>{response}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    marginBottom: 50,
  },
  confirmButton: {
    borderWidth: 3,
    fontSize: 30,
    backgroundColor: colors.LIGHT_BLUE,
    textAlign: "center",
    width: "60%",
    paddingVertical: 10,
    alignSelf: "center",
    borderRadius: 20,
    color: "white",
  },
});

export default SignUpScreen;
