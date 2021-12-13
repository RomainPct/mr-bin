import React, { useState } from "react"
import { View, StyleSheet, Image, Switch } from "react-native"
import Colors from "../../Style/Colors"
import TextBody from "../Text/TextBody"
import TextBodyDetail from "../Text/TextBodyDetail"
import RecyclableBinImage from "../../assets/images/icons/recyclable-bin.png"

export default function NotificationCell({ color }) {

    const [switchValue, setSwitchValue] = useState(true)

    return (
        <View style={{ ...styles.box, backgroundColor: Colors.translateColor(color), opacity: switchValue ? 1 : 0.5 }}>
            <View style={styles.headRow}>
                <Image style={styles.binIcon} source={RecyclableBinImage} />
                <Switch
                    value={switchValue}
                    onValueChange={value => setSwitchValue(value)}
                    thumbColor={Colors.translateColor(color)}
                    trackColor={{
                        false: Colors.white,
                        true: Colors.white
                    }}
                    ios_backgroundColor={Colors.white}
                    />
            </View>
            <TextBodyDetail style={styles.textDetail}>Être prévenu</TextBodyDetail>
            <TextBody style={styles.textMain}>La veille</TextBody>
        </View>
    )

}

const styles = StyleSheet.create({
    box: {
        borderRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 32,
        marginHorizontal: 8,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.07,
        shadowRadius: 8,
        flex: 1
    },
    headRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24
    },
    binIcon: {
        width: 40,
        height: 40
    },
    textDetail: {
        color: Colors.white
    },
    textMain: {
        color: Colors.white,
        fontSize: 19
    }
})