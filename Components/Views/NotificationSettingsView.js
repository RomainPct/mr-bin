import React from "react"
import { StyleSheet, View } from "react-native"
import Colors from "../../Style/Colors"
import NotificationCell from "../Cells/NotificationCell"
import TextBody from "../Text/TextBody"
import TextTitle from "../Text/TextTitle"

export default function NotificationSettingsView() {

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <TextTitle>Gérer mes notifications</TextTitle>
                <TextBody>Soyez prévenu avant chaque ramassage des poubelles afin de ne plus jamais oublier.</TextBody>
            </View>
            <View style={styles.row}>
                <NotificationCell color={{ class: "yellow" }} />
                <NotificationCell color={{ class: "green" }} />
            </View>
            <View style={styles.row}>
                <NotificationCell color={{ class: "blue" }} />
                <NotificationCell color={{ class: "red" }} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.white,
        padding: 16
    },
    info: {
        paddingHorizontal: 8,
        marginBottom: 8
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16
    }
})