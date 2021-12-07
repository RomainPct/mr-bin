import React from "react"
import { Animated, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"
import CloseImage from "../../assets/images/product/close_cross.png"

export default function ProductView({style, closeAction, onLayout, id}) {

    const safeAreaInsets = useSafeAreaInsets()

    return (
        <Animated.View style={{...styles.container, ...style, paddingBottom: safeAreaInsets.bottom}} onLayout={onLayout}>
            <TouchableOpacity onPress={closeAction}>
                <Image source={CloseImage} style={styles.closeButton} />
            </TouchableOpacity>
            <TextTitle style={{paddingBottom: 200, paddingTop: 40}}>{id}</TextTitle>
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: Colors.white
    },
    closeButton: {
        width: 52,
        height: 52,
        position: "absolute",
        top: 0,
        right: 0
    }
})