import React, { useContext } from "react"
import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppContext, ViewMode } from "../../Context/AppContext"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"
import CloseDownImage from "../../assets/images/icons/close-down.png"
import BellImage from "../../assets/images/icons/bell.png"
import CloseImage from "../../assets/images/icons/close.png"

export default function Header({ navigateAction }) {

    const ctx = useContext(AppContext)
    const safeAreaInsets = useSafeAreaInsets()

    return (
        <View style={{...styles.header, paddingTop: safeAreaInsets.top + 18}}>
            <View>
                <TextTitle style={styles.logo}>Mr. Bin</TextTitle>
                <Text style={styles.city}>{ctx.location}</Text>
            </View>
            {ctx.viewMode == "home" ?
            <TouchableOpacity>
                <Image source={BellImage} style={styles.buttonImage} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={_ => navigateAction(ViewMode.HOME)}>
                <Image source={CloseDownImage} style={styles.greenButtonImage} />
            </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: Colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    logo: {
        color: Colors.mainGreen,
    },
    city: {
        color: Colors.middleGreen
    },
    buttonImage: {
        width: 40,
        height: 40,
        margin: 4,
    },
    greenButtonImage: {
        width: 40,
        height: 40,
        margin: 4,
        backgroundColor: Colors.mainGreen,
        borderRadius: 20
    }
})