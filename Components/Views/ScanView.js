import { BarCodeScanner } from "expo-barcode-scanner"
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Animated, Image, Dimensions, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScanOverlayImage from "../../assets/images/scan/scan-overlay.png"
import Colors from "../../Style/Colors";

export default function ScanView({style}) {
    
    const [hasPermission, setHasPermission] = useState(null)
    const [currentScanValue, setCurrentScanValue] = useState(null)
    const safeAreaInsets = useSafeAreaInsets()

    const barcodeScanned = (scan) => {
        console.log(scan.data)
        setCurrentScanValue(scan.data)
    }
    
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    return (
        <Animated.View style={{...styles.container, ...style}}>
            <BarCodeScanner
                onBarCodeScanned={barcodeScanned}
                style={styles.scan}
                />
            <View style={styles.overlay}>
                <View style={styles.scanOverlay}>
                    <Image source={ScanOverlayImage} style={styles.scanOverlayImage} />
                </View>
                <View style={{...styles.searchOverlay, paddingBottom: safeAreaInsets.bottom }}>
                    <TextInput placeholder="Rechercher un produit..." style={styles.searchBar} value={currentScanValue} />
                </View>
            </View>
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
            backgroundColor: Colors.mainGreen
        },
        scan: {
            flex: 1,
        },
        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        },
        scanOverlay: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        scanOverlayImage: {
            width: (Dimensions.get('window').width - 48),
            height: (Dimensions.get('window').width - 48) * 15/35
        },
        searchOverlay: {
            backgroundColor: Colors.middleGreen,
        },
        searchBar: {
            height: 38,
            backgroundColor: Colors.white,
            paddingHorizontal: 16,
            margin: 24,
            borderRadius: 16
        }
    })