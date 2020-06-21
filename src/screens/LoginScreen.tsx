import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import axios from "axios";
import { dataCollected } from "../types/types";
import TextInputComp from "../components/TextInputComp";
import AsyncStorage from "@react-native-community/async-storage";
const colors = require("../../colors.json");

const LoginScreen: React.FC = ({ navigation }) => {
  const [response, setResponse] = useState<string>("");
  const [data, setData] = useState<dataCollected>({
    email: "",
    password: "",
  });

  const handleConfirm = async (): Promise<any> => {
    try {
      const res = await axios.get(
        "http://notebook-23.herokuapp.com/api/users/validation/app",
        { params: data }
      );
      setResponse("Logged in");
      const info: string[] = [res.data._id, res.data.token];
      await AsyncStorage.setItem("notebookuser", JSON.stringify(info));
      navigation.navigate("Home", { user: "logged" });
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
        <Text onPress={() => handleConfirm()} style={styles.loginButton}>
          Login
        </Text>
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
});

export default LoginScreen;
