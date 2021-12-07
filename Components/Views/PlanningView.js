import React, { useRef, useContext } from "react"
import { Dimensions, SectionList, Button, StyleSheet, Text, View, Animated } from "react-native"
import BodyContainer from "../Helpers/BodyContainer"
import BinCell from "../Cells/BinCell"
import Header from "../General/Header"
import Colors from "../../Style/Colors"
import DayHeaderCell from "../Cells/DayHeaderCell"
import ScanButton from "../General/ScanButton"
import ScanView from "./ScanView"
import { AppContext } from "../../Context/AppContext"

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

    const scanButtonAnim = useRef(new Animated.Value(0)).current
    const scanViewAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current

    const ctx = useContext(AppContext)

    const openScan = () => {
      Animated.timing(scanButtonAnim, {
        toValue: -Dimensions.get('window').height,
        duration: 400,
        useNativeDriver: true
      }).start()
      Animated.timing(scanViewAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }).start()
    }

    const closeScan = () => {
      Animated.timing(scanButtonAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }).start()
      Animated.timing(scanViewAnim, {
        toValue: Dimensions.get('window').height,
        duration: 400,
        useNativeDriver: true
      }).start()
    }

    const navigateTo = (destination) => {
      if (destination == "home") {
        closeScan()
      } else {
        openScan()
      }
      ctx.update({...ctx, viewMode: destination })
    }

    return (
        <View style={styles.container}>
            <Header navigateAction={navigateTo} />
            <BodyContainer>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index }
                    renderItem={({item}) => <BinCell item={item} />}
                    renderSectionHeader={({ section: { title }}) => <DayHeaderCell title={title} />}
                />
              <Animated.View style={{ transform: [{ translateY: scanButtonAnim }] }}>
                <ScanButton tapAction={_ => navigateTo("scan")} />
              </Animated.View>
              <ScanView  style={{ transform: [{ translateY: scanViewAnim }] }} />
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