import React, { useState ,useRef} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { dataCollected, response } from "../types/types";
import TextInputComp from "../components/TextInputComp";
import AsyncStorage from "@react-native-community/async-storage";
const colors = require("../../colors.json");

const LoginScreen: React.FC = ({ navigation }) => {
  const [response, setResponse] = useState<response>({
    responseWords: "",
    ActivityIndicator: false,
  });
  const [data, setData] = useState<dataCollected>({
    email: "",
    password: "",
  });

  const handleConfirm = async (): Promise<any> => {
    setResponse({ ...response, ActivityIndicator: true });
    try {
      const res = await axios.get(
        "http://notebook-23.herokuapp.com/api/users/validation/app",
        { params: data }
      );
      setResponse({ responseWords: "Logged in", ActivityIndicator: false });
      const info: string[] = [res.data._id, res.data.token];
      await AsyncStorage.setItem("notebookuser", JSON.stringify(info));
      navigation.navigate("Home", { user: "logged" });
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
          <Text onPress={() => handleConfirm()} style={styles.loginButton}>
            Login
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
  loginButton: {
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

export default LoginScreen;
