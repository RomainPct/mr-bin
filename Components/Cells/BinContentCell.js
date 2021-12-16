import React from "react"
import { Image, StyleSheet, View } from "react-native"
import Colors from "../../Style/Colors"
import TextBodyDetail from "../Text/TextBodyDetail"

export default function BinContentCell({ item }) {

    return (
        <View style={styles.cell}>
            <Image style={styles.icon} source={{ url: item.icon}} resizeMode="contain" />
            <TextBodyDetail style={styles.label}>{item.label}</TextBodyDetail>
        </View>
    )

}

const styles = StyleSheet.create({
    cell: {
        width: "25%",
        textAlign: "center"
    },
    icon: {
        width: "80%",
        marginHorizontal: "10%",
        height: 32
    },
    label: {
        textAlign: "center",
        marginTop: 5
    }
})