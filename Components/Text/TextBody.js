import React from "react";
import { StyleSheet, Text } from "react-native"

export default function TextBody({style, children}) {

    return (
        <Text style={{...styles.body, ...style}}>{children}</Text>
    )

}

const styles = StyleSheet.create({
    body: {
        fontSize: 15,
        fontWeight: "600"
    }
})