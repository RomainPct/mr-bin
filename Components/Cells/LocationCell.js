import React from "react"
import { Image, StyleSheet, View } from "react-native"
import TextBody from "../Text/TextBody"
import TextBodyDetail from "../Text/TextBodyDetail"
import PinIcon from "../../assets/images/icons/pin.png"
import Colors from "../../Style/Colors"

export default function LocationCell() {

    return (
        <View style={styles.cell}>
            <Image source={PinIcon} style={styles.icon} />
            <View>
                <TextBody>Position actuelle</TextBody>
                <TextBodyDetail style={styles.subtitle}>27T Rue du Progres, 36160 Montreuil, France</TextBodyDetail>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 12
    },
    subtitle: {
        color: Colors.middleGreen
    }
})