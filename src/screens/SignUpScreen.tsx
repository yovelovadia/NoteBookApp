import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import TextInputComp from "../components/TextInputComp";
import { dataCollected, response } from "../types/types";
const colors = require("../../colors.json");

const SignUpScreen: React.FC = ({ navigation }) => {
  const [response, setResponse] = useState<response>({
    responseWords: "",
    ActivityIndicator: false,
  });
  const [data, setData] = useState<dataCollected>({
    email: "",
    name: "",
    password: "",
  });

  const handleConfirm = async (): Promise<any> => {
    setResponse({ ...response, ActivityIndicator: true });
    try {
      await axios.post("https://notebook-23.herokuapp.com/api/users/add", data);
      setResponse({ responseWords: "User Created", ActivityIndicator: false });
      navigation.navigate("Login");
    } catch (err) {
      setResponse({
        responseWords: err.response.data,
        ActivityIndicator: false,
      });
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
        {response.ActivityIndicator ? (
          <ActivityIndicator color={"white"} size={60} />
        ) : (
          <Text onPress={() => handleConfirm()} style={styles.confirmButton}>
            Confirm
          </Text>
        )}
      </View>
      <Text style={styles.response}>{response.responseWords}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    marginBottom: 25,
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
  response: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
});

export default SignUpScreen;
