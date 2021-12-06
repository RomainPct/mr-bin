import React from "react";
import { StyleSheet, Text } from "react-native"

export default function TextBodyDetail({style, children}) {

    return (
        <Text style={{...styles.bodyDetail, ...style}}>{children}</Text>
    )

}

const styles = StyleSheet.create({
    bodyDetail: {
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: -0.3
    }
})