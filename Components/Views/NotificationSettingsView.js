import React, { useEffect } from "react"
import Constants from 'expo-constants'
import { StyleSheet, View } from "react-native"
import Colors from "../../Style/Colors"
import NotificationCell from "../Cells/NotificationCell"
import TextBody from "../Text/TextBody"
import TextTitle from "../Text/TextTitle"
import * as Notifications from 'expo-notifications';

export default function NotificationSettingsView() {

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log("send this token (",token,") to the server with the notification settings")
        })
    }, []);

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

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <TextTitle>Gérer mes notifications</TextTitle>
                <TextBody>Soyez prévenu avant chaque ramassage des poubelles afin de ne plus jamais oublier.</TextBody>
            </View>
            <View style={styles.row}>
                <NotificationCell color={{ class: "yellow" }} />
                <NotificationCell color={{ class: "green" }} />
            </View>
            <View style={styles.row}>
                <NotificationCell color={{ class: "blue" }} />
                <NotificationCell color={{ class: "red" }} />
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