import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { ModalProps } from "../types/types";
import { ScrollView } from "react-native-gesture-handler";
const colors = require("../../colors.json");

const NoteModal: React.FC<ModalProps> = (props) => {
  return (
    <Modal
      style={styles.container}
      onBackButtonPress={props.LeaveModal}
      isVisible={props.isModalVisible}
      swipeDirection={["left", "right"]}
      onSwipeComplete={props.LeaveModal}
    >
      <Icon
        onPress={props.LeaveModal}
        style={styles.arrowBack}
        name={"ios-arrow-round-forward"}
        size={37}
        color={"grey"}
      />

      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          scrollEnabled={true}
          autoCorrect={false}
          textAlignVertical={"top"}
          value={props.data}
          onChangeText={props.handleChange}
        />
      </ScrollView>
      <Icon
        onPress={props.deleteNote}
        style={styles.trash}
        name={"ios-trash"}
        size={45}
        color={"grey"}
      />
    </Modal>
  );
};

export default NoteModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.MODAL_COLOR,
  },
  arrowBack: {
    margin: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-end",
  },
  trash: {
    justifyContent: "flex-end",
    margin: 10,
  },
  scrollView: {
    flex: 1,
  },
  textInput: {
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "90%",
    paddingLeft: 10,
  },
});
