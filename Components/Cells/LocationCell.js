import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import TextBody from "../Text/TextBody"
import TextBodyDetail from "../Text/TextBodyDetail"
import PinIcon from "../../assets/images/icons/pin.png"
import Colors from "../../Style/Colors"

export default function LocationCell({data, onPress}) {

    return (
        <TouchableOpacity style={styles.cell} onPress={onPress}>
            <Image source={PinIcon} style={styles.icon} />
            <View>
                <TextBody>{data.title ?? "Position actuelle"}</TextBody>
                <TextBodyDetail style={styles.subtitle}>{data.label ?? `${data.name}, ${data.postalCode} ${data.city}`}</TextBodyDetail>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cell: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        marginTop: 12
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