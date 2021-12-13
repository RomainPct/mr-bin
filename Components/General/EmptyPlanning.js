import React from "react"
import { Image, StyleSheet, View } from "react-native"
import TextBody from "../Text/TextBody"
import TextTitle from "../Text/TextTitle"
import MrBinImage from "../../assets/images/mr-bin.png"

export default function EmptyPlanning() {

    return (
        <View style={styles.container}>
            <Image style={styles.illu} source={MrBinImage} />
            <TextTitle style={styles.centered}>Désolé !</TextTitle>
            <TextBody style={styles.centered}>Nous n’avons pas les informations nécessaires pour vous communiquer le planning de votre ville.</TextBody>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        alignItems: "center"
    },
    illu: {
        width: 120,
        height: 120,
        marginBottom: 24
    },
    centered: {
        textAlign: "center",
        marginBottom: 8
    }
})