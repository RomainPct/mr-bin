import React, { useContext, useRef, useState, useEffect } from "react"
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, Animated } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppContext, ViewMode } from "../../Context/AppContext"
import Colors from "../../Style/Colors"
import TextTitle from "../Text/TextTitle"
import CloseDownIcon from "../../assets/images/icons/close-down.png"
import BellIcon from "../../assets/images/icons/bell.png"
import CloseIcon from "../../assets/images/icons/close.png"
import ArrowIcon from "../../assets/images/icons/arrow.png"
import NavigationIcon from "../../assets/images/icons/navigation.png"
import LocationSwitcher from "./LocationSwitcher"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ navigateAction }) {

    const [showLocationSwitcher, setShowLocationSwitcher] = useState(false)

    const ctx = useContext(AppContext)
    const safeAreaInsets = useSafeAreaInsets()

    useEffect(_ => {
        (async () => {
            const jsonValue = await AsyncStorage.getItem('@location')
            const result = jsonValue != null ? JSON.parse(jsonValue) : null;
            ctx.update({...ctx, location: result})
            if (result == null) {
                setShowLocationSwitcher(true)
            }
        })()
    }, [])

    return (
        <View style={{...styles.header, paddingTop: safeAreaInsets.top + 18}}>
            <View>
                <TextTitle style={styles.logo}>Mr. Bin</TextTitle>
                <TouchableOpacity onPress={_ => setShowLocationSwitcher(!showLocationSwitcher)} style={styles.locationInfos}>
                    <Image source={NavigationIcon} style={styles.locationIcon} />
                    <Text style={styles.city}>{ctx.location ? ctx.location.city : "Lieu inconnu"}</Text>
                    <Image source={ArrowIcon} style={styles.locationIcon} />
                </TouchableOpacity>
            </View>
            {ctx.viewMode == "home" ?
            <TouchableOpacity>
                <Image source={BellIcon} style={styles.buttonImage} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={_ => navigateAction(ViewMode.HOME)}>
                <Image source={CloseDownIcon} style={styles.greenButtonImage} />
            </TouchableOpacity>
            }
            {showLocationSwitcher ? <LocationSwitcher style={{...styles.locationSwitcher}} closeAction={_ => setShowLocationSwitcher(false)} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        zIndex: 100,
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
    locationInfos: {
        flexDirection: "row",
        alignItems: "center"
    },
    locationIcon: {
        width: 20,
        height: 20
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
    },
    locationSwitcher: {
        position: "absolute",
        top: 120,
        left: 0,
        right: 0,
    }
})