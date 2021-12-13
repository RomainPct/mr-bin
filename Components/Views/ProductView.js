import React, { useRef, useState } from "react"
import { Animated, StyleSheet, Image, TouchableOpacity, View, Easing } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"
import TextBodyDetail from "../Text/TextBodyDetail"
import CloseImage from "../../assets/images/product/close_cross.png"
import MrBinImage from "../../assets/images/mr-bin.png"
import SortingInfoCell from "../Cells/SortingInfoCell"
import TextSubtitle from "../Text/TextSubtitle"

export default function ProductView({style, closeAction, onLayout, product}) {

    const safeAreaInsets = useSafeAreaInsets()
    const mrBinAnim = useRef(new Animated.Value(0)).current
    const [knowMoreShown, setKnowMoreShown] = useState(false)
    const height = useRef(0)

    const openKnowMore = _ => {
        const isOpening = !knowMoreShown
        setKnowMoreShown(isOpening)
        Animated.timing(mrBinAnim, {
            toValue: isOpening ? 1 : 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true
        }).start()
        localOnLayout(isOpening ? height.current - 120 : height.current)
    }

    const localOnLayout = data => {
        if (isNaN(data)) {
            height.current = data.nativeEvent.layout.height
            onLayout(data.nativeEvent.layout.height)
        } else {
            onLayout(data)
        }
    }

    const localCloseAction = _ => {
        setKnowMoreShown(false)
        mrBinAnim.setValue(0)
        closeAction()
    }

    console.log(product.data)

    return (
        <Animated.View style={{...styles.container, ...style, paddingBottom: 20 + safeAreaInsets.bottom}} onLayout={localOnLayout}>
            <TouchableOpacity onPress={localCloseAction} style={styles.closeButton}>
                <Image source={CloseImage} style={styles.closeButtonIcon} />
            </TouchableOpacity>
            <TextTitle>{product.status == "loaded" ? product.data.label : "Chargement..."}</TextTitle>
            <TextBodyDetail style={styles.brandText}>{product.data.marque ?? ""}</TextBodyDetail>
            {(product.data.poubelles ?? []).map(data =>
                <SortingInfoCell key={data.couleur.class} data={data} />
            )}
            <Animated.View style={{transform: [
                        {translateY: mrBinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -height.current]
                        })}
                    ]}}>
                <TouchableOpacity onPress={openKnowMore}>
                    <View style={styles.knowMoreBubble}>
                        <TextSubtitle>Le saviez-vous ?</TextSubtitle>
                        <TextBodyDetail>{knowMoreShown ? product.data.SaviezVous : "Cliquez-ici pour une anecdote"}</TextBodyDetail>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <Animated.Image
                source={MrBinImage}
                style={{
                    ...styles.mrBinImage,
                    transform: [
                        {scale: mrBinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1.8, 1]
                        })},
                        {rotate: mrBinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["-30deg", "0deg"]
                        })},
                        {translateY: mrBinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [25, -height.current]
                        })},
                        {translateX: mrBinAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -25]
                        })}
                    ]
                }}
                />
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
        position: "absolute"
    }
})