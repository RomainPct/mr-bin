import React from "react"
import { Image, StyleSheet, View } from "react-native"
import Colors from "../../Style/Colors"
import TextBody from "../Text/TextBody"
import TextBodyDetail from "../Text/TextBodyDetail"
import RecyclableBinImage from "../../assets/images/icons/recyclable-bin.png"

export default function SortingInfoCell({data}) {

    return (
        <View style={styles.container}>
            <View style={styles.binView}>
                <Image source={RecyclableBinImage} style={styles.binViewIcon} />
            </View>
            <View>
                <View style={styles.row}>
                    <TextBodyDetail style={styles.binLabel}>Poubelle bleu</TextBodyDetail>
                    <TextBodyDetail style={styles.separator}>-</TextBodyDetail>
                    <TextBodyDetail>Déchets 🚩</TextBodyDetail>
                </View>
                <TextBody>{data.title}</TextBody>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    binView: {
        height: 72,
        width: 72,
        marginRight: 10,
        borderRadius: 15,
        backgroundColor: Colors.Bin.blue,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.07,
        shadowRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    binViewIcon: {
        width: 40,
        height: 40
    },
    separator: {
        marginHorizontal: 5
    },
    binLabel: {
        color: Colors.Bin.blue,
    }
})