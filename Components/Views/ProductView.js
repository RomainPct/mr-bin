import React from "react"
import { Animated, StyleSheet, Image, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"
import TextBodyDetail from "../Text/TextBodyDetail"
import CloseImage from "../../assets/images/product/close_cross.png"
import MrBinImage from "../../assets/images/mr-bin.png"
import SortingInfoCell from "../Cells/SortingInfoCell"
import TextSubtitle from "../Text/TextSubtitle"

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
            <TouchableOpacity>
                <View style={styles.knowMoreBubble}>
                    <TextSubtitle>Le saviez-vous ?</TextSubtitle>
                    <TextBodyDetail>Cliquez-ici pour une anecdote</TextBodyDetail>
                </View>
            </TouchableOpacity>
            <Image source={MrBinImage} style={styles.mrBinImage} />
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
    },
    knowMoreBubble: {
        backgroundColor: Colors.lowGreen,
        padding: 20,
        marginTop: 30,
        marginRight: 88,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 20,
        color: Colors.mainGreen
    },
    mrBinImage: {
        height: 100,
        width: 100,
        bottom: 0,
        right: 0,
        position: "absolute",
        transform: [
            {scale: 1.8},
            {rotate: "-30deg"},
            {translateY: 25}
        ]
    }
})