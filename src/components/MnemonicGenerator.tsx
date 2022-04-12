import { View, Text, KeyboardAvoidingView, ImageBackground, Pressable, TextInput, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import * as Mnemonic from "../utils/mnemonic"

let invalidInput = false;


export default function MnemonicGenerator() {
  const [wordCount, setWordCount] = useState("");
  const [resultText, setResultText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getWordCount = () => {

    try {
      // Check if input is a number and within range
      if (!isNaN(+wordCount) && +wordCount >= 12 && +wordCount <= 24) {
        invalidInput = false;
        setModalVisible(true);
        setResultText(Mnemonic.generateMnemonic(wordCount));
        setWordCount("");
        setErrorText("");
      }
      else {
        invalidInput = true;
        setWordCount("");
        setErrorText("Invalid input. Please enter a number from 12 to 24!");
      }
    } catch (error) {
      setErrorText(String(error));
      console.log(error);
    }
  }
  return (
    <View style={styles.content}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <Text style={styles.contentText}>Here's your words:</Text>
          <Text style={styles.resultText}>{resultText}</Text>
          <Pressable onPress={() => {
            setModalVisible(false);
            setResultText("15");
          }}>
            <Text style={[styles.buttonText, { marginVertical: 10 }]}>OK!</Text>
          </Pressable>
        </View>
      </Modal>

      <Text style={styles.contentText}>Mnemonic Words Generator</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setWordCount}
          value={wordCount}
          placeholder="Enter word count (from 12 to 24)"
          keyboardType="numeric"
        />
      </View>
      <Pressable onPress={getWordCount}>
        <Text style={styles.buttonText}>Generate!</Text>
      </Pressable>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  )
}
const shawdows = {
  shadowOpacity: 0.5,
  shadowRadius: 10,
}
const styles = StyleSheet.create({
  content: {
    //textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000000a0",
    width: 450,
    paddingVertical: 50,
    marginBottom: 15,
    borderRadius: 15
  },
  contentText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  resultText: {
    marginTop: 5,
    textAlign: "center",
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: "bold",
    color: 'yellow'
  },
  errorText: {
    marginTop: 5,
    textAlign: "center",
    flexWrap: 'wrap',
    color: 'red'
  },
  input: {
    width: 315,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modal: {
    backgroundColor: "#000000e0",
    borderColor: 'white',
    borderWidth: 5,
    width: "100%",
    height: "100%",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    flexDirection: 'column',
    textAlign: "center"
  }
})