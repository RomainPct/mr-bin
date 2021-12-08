import React from "react";
import { StyleSheet, Text } from "react-native"

export default function TextSubtitle({style, children}) {

    return (
        <Text style={{...styles.subtitle, ...style}}>{children}</Text>
    )

}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 18,
        fontFamily: "SergioTrendy-Regular"
    }
})