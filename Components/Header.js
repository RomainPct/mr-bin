import React, { useContext } from "react"
import { StyleSheet, View, Text } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppContext } from "../Context/AppContext"
import Colors from "../Style/Colors"

export default function Header() {

    const ctx = useContext(AppContext)
    const safeAreaInsets = useSafeAreaInsets()

    return (
        <View style={{...styles.header, paddingTop: safeAreaInsets.top + 18}}>
            <View>
                <Text style={styles.logo}>Mr. Bin</Text>
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
        paddingBottom: 24
    },
    logo: {
        fontSize: 20,
        color: Colors.mainGreen,
        fontWeight: "bold",
        fontFamily: "SergioTrendy-Regular"
    },
    city: {
        color: Colors.middleGreen
    }
})