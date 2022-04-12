import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { getMultiSig } from '../utils/address';

export default function MultiSegP2SHGenerator() {
  const [mValue, setMValue] = useState("");
  const [nValue, setNValue] = useState("");
  const [publicKeys, setPublicKeys] = useState("");
  const [resultText, setResultText] = useState<string | undefined>("");
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const generateAddress = async () => {

    if (isNaN(+mValue) || isNaN(+nValue)) {
      setErrorText('Please enter only numeric value on m and n values.')
      return;
    }

    if (+nValue < +mValue) {
      setErrorText('n value must be greater than m value.')
      return;
    }

    let _pubKeys = publicKeys.split(',');
    if (_pubKeys.length != +nValue) {
      setErrorText('Please enter ' + nValue + ' public keys!');
      return;
    }

    _pubKeys.forEach((key) => {
      console.log('Public Key Found:', key);
    })

    let re = /[0-9A-Fa-f]{6}/g;
    for (let i = 0; i < _pubKeys.length; i++) {
      if (!re.test(_pubKeys[i])) {
        setErrorText('Please enter ' + nValue + ' valid public key(s)!');
        return;
      }
    }

    try {
      let address = getMultiSig(mValue, _pubKeys);
      if (address != "") {
        setModalVisible(true);
        setErrorText("");
        setResultText(address);
      }
      else {
        setErrorText("Error generating address.");
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
          <Text style={styles.contentText}>Wallet address generated:</Text>
          <Text style={styles.resultText}>{resultText}</Text>
          <Pressable onPress={() => {
            setModalVisible(false);
            setResultText("15");
          }}>
            <Text style={[styles.buttonText, { marginVertical: 10 }]}>OK!</Text>
          </Pressable>
        </View>
      </Modal>

      <Text style={styles.contentText}>MultiSig P2SH Address Generator</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMValue}
        value={mValue}
        placeholder="Enter m value"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNValue}
        value={nValue}
        placeholder="Enter n value"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPublicKeys}
        value={publicKeys}
        placeholder='Enter public keys, split each key with a ",". E.g. key1,key2,key3...'
        multiline
        numberOfLines={5}
      />
      <Pressable onPress={generateAddress}>
        <Text style={styles.buttonText}>Generate!</Text>
      </Pressable>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  content: {
    //textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    width: 450,
    marginTop: 30,
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
