import React, { useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"

export default function ScanView({style}) {

    return (
        <Animated.View style={{...styles.container, ...style}}>
            <Text>Scan</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "red"
    }
})