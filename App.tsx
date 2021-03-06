import React from 'react'
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
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
  Linking.openURL('https://github.com/kelvinthh/btc-playground-mobile')

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.titleText}>BitCoin Playground</Text>
            <Pressable onPress={ToGitHub}>
              <View style={styles.name}>
                <Text style={{ color: 'white' }}>
                  Created by{' '}
                  <Text style={{ fontWeight: 'bold' }}>Kelvin Tam</Text> w/{' '}
                  <Text style={{ fontWeight: 'bold' }}>React Native</Text>
                </Text>
                <Image
                  style={styles.tinyLogo}
                  source={require('.//src/misc/GitHub-Emblem.png')}
                />
              </View>
            </Pressable>
          </View>
          <ScrollView>
            <MnemonicGenerator />
            <AddressGenerator />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    //justifyContent: 'center',
  },
  content: {
    backgroundColor: '#000000c0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    paddingTop: 100
  },
  tinyLogo: {
    width: 60,
    height: 30,
  },
  name: {
    //marginTop: -5,
    flexDirection: 'column',
  },
})
export default App
