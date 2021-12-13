import React, { useRef, useContext, useEffect, useState } from "react"
import { Dimensions, SectionList, Button, StyleSheet, Text, View, Animated, Keyboard } from "react-native"
import BodyContainer from "../Helpers/BodyContainer"
import BinCell from "../Cells/BinCell"
import Header from "../General/Header"
import Colors from "../../Style/Colors"
import DayHeaderCell from "../Cells/DayHeaderCell"
import ScanButton from "../General/ScanButton"
import ScanView from "./ScanView"
import { AppContext, ViewMode } from "../../Context/AppContext"
import MrBinAPI from "../../Managers/MrBinAPI"
import NotificationSettingsView from "./NotificationSettingsView"

export default function PlanningView() {

    const [planningData, setPlanningData] = useState([])

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
      Keyboard.dismiss()
      if (destination == ViewMode.HOME) {
        closeScan()
      } else if (destination == ViewMode.SCAN) {
        openScan()
      }
      ctx.update({...ctx, viewMode: destination })
    }

    const loadPlanning = _ => {
      if (!ctx.location) { return }
      MrBinAPI.getPlanning(ctx.location.postalCode)
          .then(planning => setPlanningData(planning))
          .catch(err => console.log(err))
    }

    useEffect(_ => {
      loadPlanning()
    }, [ctx.location])

    return (
        <View style={styles.container}>
            <Header navigateAction={navigateTo} />
            <BodyContainer>
                {ctx.viewMode == ViewMode.NOTIFICATIONS ? <NotificationSettingsView /> : null}
                <SectionList
                    sections={planningData}
                    keyExtractor={(item, index) => item + index }
                    renderItem={({item}) => <BinCell item={item} />}
                    renderSectionHeader={({ section: { title }}) => <DayHeaderCell title={title} />}
                />
              <Animated.View style={{ transform: [{ translateY: scanButtonAnim }] }}>
                <ScanButton tapAction={_ => navigateTo(ViewMode.SCAN)} />
              </Animated.View>
              <ScanView style={{ transform: [{ translateY: scanViewAnim }] }} />
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