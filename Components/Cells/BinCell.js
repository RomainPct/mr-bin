import React from "react"
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextBody from './../Text/TextBody'
import TextBodyDetail from './../Text/TextBodyDetail'
import Colors from './../../Style/Colors'
import BinContentCell from "./BinContentCell";

export default function BinCell({item, onPress, isOpen}) {

    const color = Colors.translateColor(item.poubelles.couleur)

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.shadowBox}>
                <View style={styles.cell}>
                    <View style={{...styles.headRow, backgroundColor: isOpen ? color : Colors.white}}>
                        <View style={{...styles.timingBlock, backgroundColor: color}}>
                            <TextBodyDetail style={styles.whiteText}>À partir de</TextBodyDetail>
                            <TextBody style={styles.whiteText}>{item.passageDate.getHours()}h{`0${item.passageDate.getMinutes()}`.slice(-2)}</TextBody>
                        </View>
                        <TextBody style={{...styles.title, color: isOpen ? Colors.white : item.color}}>Poubelle {item.poubelles.couleur.label}</TextBody>
                    </View>
                    {isOpen ? 
                    <View style={styles.infoRow}>
                        <TextBodyDetail style={styles.subtitle}>Informations</TextBodyDetail>
                        <TextBody style={styles.info}>💥 Le ramassage de la poubelle jaune se fait hebdomadairement sauf si jour férié.</TextBody>
                        <TextBodyDetail style={styles.subtitle}>Que peut-on y jeter ?</TextBodyDetail>
                        <View style={styles.contentBox}>
                            {item.poubelles.contenues.map(content => (
                                <BinContentCell item={content} />
                            ))}
                        </View>
                    </View>
                    : null
                    }
                </View>
            </View>
        </TouchableOpacity>
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
    },
    infoRow: {
        padding: 10
    },
    subtitle: {
        opacity: 0.7,
        marginBottom: 5
    },
    info: {
        marginBottom: 20
    },
    contentBox: {
        flexDirection: "row",
        marginTop: 10
    }
})