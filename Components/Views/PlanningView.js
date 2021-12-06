import React from "react"
import { ColorPropType, SectionList } from "react-native"
import { Button, StyleSheet, Text, View } from 'react-native'
import BodyContainer from "../Helpers/BodyContainer"
import ContextTestView from "../ContextTestView"
import BinCell from "../Cells/BinCell"
import Header from "../General/Header"
import Colors from "../../Style/Colors"
import DayHeaderCell from "../Cells/DayHeaderCell"
import ScanButton from "../General/ScanButton"

export default function PlanningView() {

    const DATA = [
        {
          title: "Lundi",
          data: [
            {
              name: "Verte",
              color: Colors.Bin.green
            }
          ]
        },
        {
          title: "Mercredi",
          data: [
            {
              name: "Jaune",
              color: Colors.Bin.yellow
            },
            {
              name: "Bleue",
              color: Colors.Bin.blue
            }
          ]
        },
        {
          title: "Vendredi",
          data: [
            {
              name: "Verte",
              color: Colors.Bin.green
            }
          ]
        }
      ]

    return (
        <View style={styles.container}>
            <Header />
            <BodyContainer>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index }
                    renderItem={({item}) => <BinCell item={item} />}
                    renderSectionHeader={({ section: { title }}) => <DayHeaderCell title={title} />}
                />
              {/* <ContextTestView/> */}
              <ScanButton />
            </BodyContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });