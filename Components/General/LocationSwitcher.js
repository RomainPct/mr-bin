import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import Colors from "../../Style/Colors"
import LocationCell from "../Cells/LocationCell"

export default function LocationSwitcher({ style }) {

    return (
        <View style={{ ...styles.container, ...style}}>
            <TextInput placeholder="Trouver un lieu..." style={styles.searchBar} />
            <View style={{ height: 1, width: '100%', backgroundColor: Colors.mainGreen, marginVertical: 20 }} />
            <LocationCell />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 24,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.125,
        shadowRadius: 4,
    },
    searchBar: {
        height: 40,
        backgroundColor: Colors.lowGreen,
        paddingHorizontal: 16,
        borderRadius: 16
    }
})