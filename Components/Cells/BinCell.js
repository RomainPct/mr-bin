import React from "react"
import { StyleSheet, View } from 'react-native';
import TextBody from './../Text/TextBody'
import TextBodyDetail from './../Text/TextBodyDetail'
import Colors from './../../Style/Colors'

export default function BinCell({item}) {

    const translateColor = ({ poubelles : {couleur} }) => {
        switch (couleur.class) {
            case 'yellow': return Colors.Bin.yellow
            case 'blue': return Colors.Bin.blue
            case 'green': return Colors.Bin.green
            case 'red': return Colors.Bin.red
            default: return Colors.mainGreen
        }
    }

    return (
        <View style={styles.shadowBox}>
            <View style={styles.cell}>
                <View style={styles.headRow}>
                    <View style={{...styles.timingBlock, backgroundColor: translateColor(item)}}>
                        <TextBodyDetail style={styles.whiteText}>À partir de</TextBodyDetail>
                        <TextBody style={styles.whiteText}>{item.passageDate.getHours()}h{`0${item.passageDate.getMinutes()}`.slice(-2)}</TextBody>
                    </View>
                    <TextBody style={{...styles.title, color: item.color}}>Poubelle {item.poubelles.couleur.label}</TextBody>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadowBox: {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "white",
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.05,
        shadowRadius: 18,
    },
    cell: {
        borderRadius: 12,
        overflow: "hidden"
    },
    headRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    timingBlock: {
        backgroundColor: Colors.middleGreen,
        paddingVertical: 12,
        width: 80,
        alignItems: "center"
    },
    title: {
        paddingHorizontal: 12
    },
    whiteText: {
        color: Colors.white
    }
})