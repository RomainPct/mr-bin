import React from "react"
import { View, Image, StyleSheet } from "react-native"
import TextBody from "../Text/TextBody"
import TextSubtitle from "../Text/TextSubtitle"
import MrBinImage from "../../assets/images/mr-bin.png"
import Colors from "../../Style/Colors"

export default function EmptyResultCell() {

    return (
        <View style={styles.container}>
            <View style={styles.textsBox}>
                <TextSubtitle>Désolé...</TextSubtitle>
                <TextBody>Nous n’avons pas trouvé le produit que vous recherchez.</TextBody>
            </View>
            <Image source={MrBinImage} style={styles.illustration} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        marginHorizontal: 24,
        padding: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    textsBox: {
        flex: 1,
    },
    illustration: {
        height: 80,
        width: 80
    }
})