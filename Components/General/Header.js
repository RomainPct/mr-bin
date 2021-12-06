import React, { useContext } from "react"
import { StyleSheet, View, Text } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppContext } from "../../Context/AppContext"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"

export default function Header() {

    const ctx = useContext(AppContext)
    const safeAreaInsets = useSafeAreaInsets()

    return (
        <View style={{...styles.header, paddingTop: safeAreaInsets.top + 18}}>
            <View>
                <TextTitle style={styles.logo}>Mr. Bin</TextTitle>
                <Text style={styles.city}>{ctx.location}</Text>
            </View>
            <Text>
                Notifs
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    logo: {
        color: Colors.mainGreen,
    },
    city: {
        color: Colors.middleGreen
    }
})