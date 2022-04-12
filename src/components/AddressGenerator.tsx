import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SegWitAddressGenerator from './SegWitAddressGenerator';
import MultiSigGenerator from './MultiSigGenerator';

export default function AddressGenerator() {
    const [mode, setMode] = useState(0);
    const showGenerator = () => {
        switch (mode) {
            case 1:
                return (<SegWitAddressGenerator />);
            case 2:
                return (<MultiSigGenerator />);
            default:
                return (<></>);

        }
    }
    return (
        <View style={styles.content}>
            <Text style={styles.contentText}>Wallet Address Generator</Text>
            {mode === 0 ? (<Text style={{ color: 'white' }}>Select wallet type:</Text>) : (<></>)}
            <View style={styles.buttonGroup}>
                <Pressable onPress={() => setMode(1)}>
                    <Text style={styles.buttonText}>HD SegWit</Text>
                </Pressable>
                <Pressable onPress={() => setMode(2)}>
                    <Text style={styles.buttonText}>N-Out-Of-M MultiSig</Text>
                </Pressable>
            </View>
            {showGenerator()}
        </View>

    )
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
    buttonGroup: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'space-around'
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
        marginHorizontal: 5
    }
})
