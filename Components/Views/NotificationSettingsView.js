import React, { useContext, useEffect, useState } from "react"
import Constants from 'expo-constants'
import { StyleSheet, View } from "react-native"
import Colors from "../../Style/Colors"
import NotificationCell from "../Cells/NotificationCell"
import TextBody from "../Text/TextBody"
import TextTitle from "../Text/TextTitle"
import * as Notifications from 'expo-notifications';
import MrBinAPI from "../../Managers/MrBinAPI"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from "../../Context/AppContext"

export default function NotificationSettingsView() {

    const ctx = useContext(AppContext)
    const [pushToken, setPushToken] = useState(null)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => { setPushToken(token) });
      (async () => {
          const jsonValue = await AsyncStorage.getItem('@notifications')
          const result = jsonValue != null ? JSON.parse(jsonValue) : [];
          setNotifications(result)
      })()
    }, []);

    useEffect(_ => {
      if (pushToken == null) return
      if (!ctx.location) return
      MrBinAPI.sendNotificationSettings({
        token: pushToken,
        postalCode: ctx.location.postalCode,
        notifications: notifications
      })
        .then(result => console.log("Success : ", result))
        .catch(e => console.log("Error : ", e));
      (async () => {
          await AsyncStorage.setItem('@notifications', JSON.stringify(notifications))
      })()
    }, [pushToken, notifications])

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        return token;
      }

    const toggleNotification = (_enabled, _id) => {
      if (_enabled) {
        setNotifications([...notifications, _id])
      } else {
        notifs = notifications.filter(value => value != _id)
        setNotifications(notifs)
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <TextTitle>Gérer mes notifications</TextTitle>
                <TextBody>Soyez prévenu avant chaque ramassage des poubelles afin de ne plus jamais oublier.</TextBody>
            </View>
            <View style={styles.row}>
                <NotificationCell onToggle={toggleNotification} enabled={notifications.includes("yellow")} available={pushToken != null} color={{ class: "yellow" }} />
                <NotificationCell onToggle={toggleNotification} enabled={notifications.includes("green")} available={pushToken != null} color={{ class: "green" }} />
            </View>
            <View style={styles.row}>
                <NotificationCell onToggle={toggleNotification} enabled={notifications.includes("blue")} available={pushToken != null} color={{ class: "blue" }} />
                <NotificationCell onToggle={toggleNotification} enabled={notifications.includes("red")} available={pushToken != null} color={{ class: "red" }} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.white,
        padding: 16
    },
    info: {
        paddingHorizontal: 8,
        marginBottom: 8
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16
    }
})