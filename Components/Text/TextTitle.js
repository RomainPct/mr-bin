import React from "react";
import { StyleSheet, Text } from "react-native"

export default function TextTitle({style, children}) {

    return (
        <Text style={{...styles.title, ...style}}>{children}</Text>
    )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: "SergioTrendy-Regular"
    }
})