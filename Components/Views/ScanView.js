import { BarCodeScanner } from "expo-barcode-scanner"
import { BlurView } from "expo-blur"
import React, { useState, useEffect, useRef, useContext } from "react"
import { View, Text, StyleSheet, Animated, Image, Dimensions, TextInput, Button } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScanOverlayImage from "../../assets/images/scan/scan-overlay.png"
import { AppContext } from "../../Context/AppContext"
import MrBinAPI from "../../Managers/MrBinAPI"
import Colors from "../../Style/Colors";
import SearchResults from "../General/SearchResults"
import ProductView from "./ProductView"

export default function ScanView({style}) {
    
    const [isSearching, setIsSearching] = useState(false)
    const [query, setQuery] = useState("")
    const [hasPermission, setHasPermission] = useState(null)
    const [currentScanValue, setCurrentScanValue] = useState({ status: "empty", data: {} })
    const productViewAnim = useRef(new Animated.Value(0)).current
    const searchInputRef = useRef(null)
    const safeAreaInsets = useSafeAreaInsets()
    const ctx = useContext(AppContext)

    const barcodeScanned = (scan) => {
        if (currentScanValue.status != "empty") { return }
        if (!ctx.location) { return }
        searchInputRef.current.blur()
        setCurrentScanValue({
            status: "loading",
            id: scan.data,
            data: {}
        })
        MrBinAPI.getProductInfo(scan.data, ctx.location.postalCode)
            .then(result => {
                setCurrentScanValue({
                    status: "loaded",
                    id: scan.data,
                    data: result[0]
                })
            })
            .catch(e => {
                setCurrentScanValue({ status: "loaded", id: scan.data, data: { label: "Produit inconnu" } })
                console.log("Error while getting product info : ",e)
            })
        Animated.timing(productViewAnim, {
            toValue: -100,
            duration: 350,
            useNativeDriver: true
        }).start()
    }

    const adjustProductView = (height) => {
        if (currentScanValue.status == "empty") { return }
        Animated.timing(productViewAnim, {
            toValue: -height,
            duration: 350,
            useNativeDriver: true
        }).start()
    }

    const closeProductView = () => {
        setCurrentScanValue({ status: "empty", data: {} })
        Animated.timing(productViewAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const searchHasBeenUnfocused = _ => {
        if (query.length == 0) {
            setIsSearching(false)   
        }
    }

    const searchHasBeenFocused = _ => {
        closeProductView()
        setIsSearching(true)
    }

    useEffect(_ => {
        closeProductView()
        setIsSearching(false)
        setQuery("")
    }, [ctx.viewMode])
    
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
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
                {/* <Button title="test" onPress={_ => barcodeScanned({data: "3017620425035"})} /> */}
                {!isSearching ? <View style={styles.scanOverlay}>
                    <Image source={ScanOverlayImage} style={styles.scanOverlayImage} />
                </View> : null}
                <BlurView intensity={80} style={{...styles.searchOverlay, paddingBottom: safeAreaInsets.bottom, flex: isSearching ? 1 : 0 }}>
                    <TextInput
                        ref={searchInputRef}
                        placeholder="Rechercher un produit..."
                        style={styles.searchBar}
                        value={query}
                        onChangeText={text => setQuery(text)}
                        onFocus={searchHasBeenFocused}
                        onBlur={searchHasBeenUnfocused}
                        returnKeyType="search"
                        />
                    {isSearching ? <SearchResults query={query} detailAction={barcodeScanned} /> : null}
                </BlurView>
            </View>
            <ProductView product={currentScanValue} closeAction={closeProductView} style={{ transform: [{ translateY: productViewAnim }] }} onLayout={height => adjustProductView(height)} />
        </Animated.View>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
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