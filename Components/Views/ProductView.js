import React from "react"
import { Animated, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"
import TextBodyDetail from "../Text/TextBodyDetail"
import CloseImage from "../../assets/images/product/close_cross.png"
import SortingInfoCell from "../Cells/SortingInfoCell"

export default function ProductView({style, closeAction, onLayout, id}) {

    const safeAreaInsets = useSafeAreaInsets()

    const DATA = [
        {
            key: "iihdz",
            title: "Bouteille & Flacon lavé"
        },
        {
            key: "iihdzesca",
            title: "Bouchon & Flacon non-lavé"
        }
    ]

    return (
        <Animated.View style={{...styles.container, ...style, paddingBottom: 20 + safeAreaInsets.bottom}} onLayout={onLayout}>
            <TouchableOpacity onPress={closeAction} style={styles.closeButton}>
                <Image source={CloseImage} style={styles.closeButtonIcon} />
            </TouchableOpacity>
            <TextTitle>{id}</TextTitle>
            <TextBodyDetail style={styles.brandText}>Eco-Water</TextBodyDetail>
            {DATA.map(data => <SortingInfoCell data={data} />)}
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        paddingTop: 20,
        paddingHorizontal: 40,
        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    closeButton: {
        width: 52,
        height: 52,
        position: "absolute",
        zIndex: 10,
        top: 0,
        right: 0,
    },
    closeButtonIcon: {
        width: 52,
        height: 52
    },
    brandText: {
        opacity: 0.6
    }
})