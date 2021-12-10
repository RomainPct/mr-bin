import React, { useContext, useEffect, useRef, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import Colors from "../../Style/Colors"
import LocationCell from "../Cells/LocationCell"
import * as Location from 'expo-location'
import { AppContext } from "../../Context/AppContext"
import AsyncStorage from '@react-native-async-storage/async-storage';
import MrBinAPI from "../../Managers/MrBinAPI"

export default function LocationSwitcher({ style, closeAction }) {

    const ctx = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState(null)
    const [location, setLocation] = useState({ name: "Géolocalisation en cours..."});
    const [searchResults, setSearchResults] = useState([])
    const lastSearchChange = useRef(null)
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            let decodedLocation = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            if (decodedLocation.length > 0) {
                setLocation(decodedLocation[0])
                if (ctx.location == null) {
                    selectLocation(decodedLocation[0])
                }
            } else {
                console.log('Failed reverse geocoding');
            }
        })()
    }, [])

    const selectLocation = (location) => {
        ctx.update({ ...ctx, location: location});
        (async () => {
            await AsyncStorage.setItem('@location', JSON.stringify(location))
        })()
        closeAction()
    }

    const searchDidChange = newValue => {
        const now = Date.now()
        lastSearchChange.current = now
        setSearchQuery(newValue)
        setTimeout(() => {
            if (now != lastSearchChange.current) { return }
            MrBinAPI.searchForAnAddress(newValue)
                .then(results => setSearchResults(results))
                .catch(e => console.log(e))
        }, 400);
    }
    
    return (
        <View style={{ ...styles.container, ...style}}>
            <TextInput placeholder="Trouver un lieu..." style={styles.searchBar} value={searchQuery} onChangeText={searchDidChange} />
            {searchResults.map(result =>
                <LocationCell key={result.id} data={result} onPress={_ => selectLocation(result)} />
            )}
            <View style={{ height: 1, width: '100%', backgroundColor: Colors.mainGreen, marginTop: 20 }} />
            {location != null ? <LocationCell data={location} onPress={_ => selectLocation(location)} /> : null}
            {ctx.location != null && ctx.location.name != location.name ? <LocationCell data={{...ctx.location, title: "Position sélectionnée" }} /> : null}
        </View>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.white,
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 12,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            shadowColor: Colors.black,
            shadowOffset: {width: 0, height: 8},
            shadowOpacity: 0.125,
            shadowRadius: 4,
        },
        searchBar: {
            height: 40,
            backgroundColor: Colors.lowGreen,
            paddingHorizontal: 16,
            borderRadius: 16
        }
    })