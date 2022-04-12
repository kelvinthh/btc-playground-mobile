import React, { Linking } from 'react-native'
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import MnemonicGenerator from './src/components/MnemonicGenerator'
import AddressGenerator from './src/components/AddressGenerator'

const image = {
  uri: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
}
const ToGitHub = () =>
  Linking.openURL('https://github.com/kelvinthh/btc-playground')

const App = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <View style={styles.content}>
          <View style={{ marginBottom: 50 }}>
            <Text style={styles.titleText}>BitCoin Playground</Text>
            <Pressable onPress={ToGitHub}>
              <View style={styles.name}>
                <Text style={{ color: 'white' }}>
                  Created by <b>Kelvin Tam</b> w/ <b>React Native Web</b>
                </Text>
                <Image
                  style={styles.tinyLogo}
                  source={require('.//src/misc/GitHub-Emblem.png')}
                />
              </View>
            </Pressable>
          </View>
          <MnemonicGenerator />
          <AddressGenerator />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    //textAlign: "center",
    backgroundColor: '#000000c0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 60,
    height: 30,
    marginLeft: 10,
  },
  name: {
    marginTop: -5,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
export default App
