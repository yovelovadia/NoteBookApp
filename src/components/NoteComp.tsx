import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import axios from "axios";
import { NotesProps } from "../types/types";
import NoteModal from "./NoteModal";
const colors = require("../../colors.json");

const NoteComp: React.FC<NotesProps> = (props) => {
  const [data, setData] = useState<string>(props.note.data);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const handleChange = (info: string): void => {
    // on text change
    let words = info;
    if (words.match(/^ *$/)) {
      words = "";
    }

    setData(info);
    const data = {
      data: words,
      _id: props.note._id,
    };

    axios
      .put("https://notebook-23.herokuapp.com/api/notes/update", data)
      .catch((err) => alert("error occured"));
    setData(words);
  };

  const deleteNote = async (): Promise<any> => {
    // deleting a note (trash icon)
    await axios.delete(
      `http://notebook-23.herokuapp.com/api/notes/${props.note._id}`
    );
    setModalIsVisible(false);
    props.refreshComponent();
  };

  const modalStateChange = (): void => {
    //exit/open modal note
    setModalIsVisible(!modalIsVisible);
  };
  return (
    <View>
      <Text onPress={modalStateChange} style={styles.container}>
        {data}
      </Text>
      <NoteModal
        deleteNote={deleteNote}
        LeaveModal={modalStateChange}
        isModalVisible={modalIsVisible}
        data={data}
        handleChange={handleChange}
      />
    </View>
  );
};

export default NoteComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT_BLUE,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    color: "white",
    fontSize: 20,
    padding: 10,
    width: "100%",
    height: 140,
  },
});
