import React from "react";
import { StyleSheet } from "react-native";
import TextBody from "../Text/TextBody";

export default function DayHeaderCell({title}) {

    return (
        <TextBody style={styles.header}>{title}</TextBody>
    )

}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 8,
        textTransform: "capitalize"
    }
})