import React from "react"
import { StyleSheet, View } from 'react-native';

export default function BodyContainer({children}) {

    return (
        <View style={{flex: 1, width: "100%"}}>
            {children}
        </View>
    )

}