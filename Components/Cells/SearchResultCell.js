import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Colors from "../../Style/Colors"
import TextBodyDetail from "../Text/TextBodyDetail"
import TextSubtitle from "../Text/TextSubtitle"

export default function SearchResultCell({ item, onPress }) {

    console.log(item)

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <TextBodyDetail style={styles.subtitle}>{item.marque}</TextBodyDetail>
            <TextSubtitle>{item.label}</TextSubtitle>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginHorizontal: 24,
        padding: 16
    },
    subtitle: {
        color: Colors.middleGreen,
        textTransform: "uppercase"
    }
})