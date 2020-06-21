import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Logged } from "../types/types";
const colors = require("../../colors.json");

var parsedInfo: string[];
var res: string | null;

const HomeScreen: React.FC = ({ navigation }) => {
  const [logged, setLogged] = useState<Logged | null>(null);

  useEffect(() => {
    const checkLogged = async (): Promise<any> => {
      res = await AsyncStorage.getItem("notebookuser");
      if (res !== null) {
        parsedInfo = JSON.parse(res);
        const data = await axios.get(
          `http://notebook-23.herokuapp.com/api/users/${parsedInfo[0]}`
        );
        setLogged({ name: data.data, _id: parsedInfo[0], jwt: parsedInfo[1] });
      }
    };
    checkLogged();
  });

  const goToNotes = (): void => {
    navigation.navigate("Notes", logged);
  };

  const logOut = async (): Promise<any> => {
    await AsyncStorage.clear();
    setLogged(null);
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/HomeScreen.png")}
    >
      <Text style={styles.logo}>NoteBook</Text>

      {logged ? (
        <View style={styles.buttonsContainer}>
          <Text style={styles.button} onPress={goToNotes}>
            Your notes
          </Text>
          <Text style={styles.loginLogoutButton} onPress={logOut}>
            Logout
          </Text>
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <Text
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")}
          >
            SignUp!
          </Text>
          <Text
            style={styles.loginLogoutButton}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    color: "white",
    letterSpacing: 2,
    fontSize: 45,
    top: 100,
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 100,
  },
  button: {
    fontSize: 35,
    borderWidth: 3,
    borderColor: "white",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    color: "white",
    backgroundColor: colors.LIGHT_BLUE,
    marginBottom: 10,
  },

  loginLogoutButton: { fontSize: 25, color: "white" },
});

export default HomeScreen;
