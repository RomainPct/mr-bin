import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "../../Style/Colors"
import TextBodyDetail from "../Text/TextBodyDetail"
import TextTitle from "../Text/TextTitle"
import BarCode from "./../../assets/images/icons/BarCode.png"

export default function ScanButton() {

    const safeAreaInsets = useSafeAreaInsets()
    
    return (
        <TouchableOpacity onPress={_ => console.log('test')}>
            <View style={{...styles.scanButton, paddingBottom: 40 + safeAreaInsets.bottom }}>
                <Image style={styles.icon} source={BarCode} />
                <View>
                    <TextBodyDetail style={styles.white}>Besoin d’aide pour trier tes déchets ?</TextBodyDetail>
                    <TextTitle style={styles.white}>Scan un produit</TextTitle>
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    scanButton: {
        backgroundColor: Colors.mainGreen,
        padding: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 24
    },
    white: {
        color: Colors.white
    }
})