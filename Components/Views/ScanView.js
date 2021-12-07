import { BarCodeScanner } from "expo-barcode-scanner"
import { BlurView } from "expo-blur"
import React, { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Image, Dimensions, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScanOverlayImage from "../../assets/images/scan/scan-overlay.png"
import Colors from "../../Style/Colors";
import ProductView from "./ProductView"

export default function ScanView({style}) {
    
    const [hasPermission, setHasPermission] = useState(null)
    const [currentScanValue, setCurrentScanValue] = useState(null)
    const productViewAnim = useRef(new Animated.Value(0)).current
    const safeAreaInsets = useSafeAreaInsets()

    const barcodeScanned = (scan) => {
        if (currentScanValue != null) { return }
        setCurrentScanValue(scan.data)
        Animated.timing(productViewAnim, {
            toValue: -200 + safeAreaInsets.bottom,
            duration: 350,
            useNativeDriver: true
        }).start()
    }

    const closeProductView = () => {
        console.log('close product view')
        Animated.timing(productViewAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
        setCurrentScanValue(null)
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
                <BlurView intensity={80} style={{...styles.searchOverlay, paddingBottom: safeAreaInsets.bottom }}>
                    <TextInput placeholder="Rechercher un produit..." style={styles.searchBar} />
                </BlurView>
            </View>
            <ProductView id={currentScanValue} closeAction={closeProductView} style={{ transform: [{ translateY: productViewAnim }] }} onLayout={data => console.log(data.nativeEvent.layout.height)} />
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
            height: 40,
            backgroundColor: Colors.white,
            paddingHorizontal: 16,
            margin: 24,
            borderRadius: 16
        }
    })