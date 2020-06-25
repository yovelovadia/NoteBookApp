import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import NoteComp from "../components/NoteComp";
import { useHeaderHeight } from "@react-navigation/stack";
const colors = require("../../colors.json");

var headerHeight: number;
var userId: string;
var token: string;

const NotesScreen: React.FC = ({ route }) => {
  const [notes, setNotes] = useState<null | any[]>(null);
  const [activityIndicator, setActivityIndicator] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(true);

  headerHeight = useHeaderHeight();
  userId = route.params._id;
  token = route.params.jwt;

  useEffect(() => {
    const getNotes = async (): Promise<any> => {
      // getting all the notes from api
      const data = await axios.get(
        "https://notebook-23.herokuapp.com/api/notes/get-notes",
        {
          params: { userId },
        }
      );
      setNotes(data.data);
    };
    getNotes().then(() => {
      setActivityIndicator(false);
    });
  }, [userId, refresh]);

  const refreshComponent = (): void => {
    //refresh the component needed after changes on children
    setRefresh(!refresh);
  };

  const newNote = async (): Promise<any> => {
    //creating new note and deleting those who are empty
    setActivityIndicator(true);
    const data = {
      userId,
      token: `bearer ${token}`,
    };

    await axios
      .delete("https://notebook-23.herokuapp.com/api/notes/delete-notes")
      .catch((err) => console.log(err));

    await axios.post("https://notebook-23.herokuapp.com/api/notes/add-note", {
      params: data,
    });
    refreshComponent();
  };

  return (
    <ImageBackground
      source={require("../assets/HomeScreen.png")}
      style={styles.container}
    >
      <ScrollView style={{ marginTop: headerHeight }}>
        {activityIndicator ? (
          <ActivityIndicator color={"white"} size={80} />
        ) : null}

        {notes
          ? notes.map((note) => (
              <NoteComp
                refreshComponent={refreshComponent}
                key={note._id}
                note={note}
              />
            ))
          : null}
      </ScrollView>

      <Text style={styles.newNoteButton} onPress={newNote}>
        +
      </Text>
    </ImageBackground>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newNoteButton: {
    position: "absolute",
    borderWidth: 1,
    borderRadius: 100,
    fontSize: 30,
    width: 80,
    padding: 20,
    textAlign: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
    margin: 10,
    backgroundColor: colors.LIGHT_BLUE,
    color: "white",
    borderColor: colors.DARK_BLUE,
  },
});
