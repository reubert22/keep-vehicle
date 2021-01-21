import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { View, StyleSheet } from "react-native";
import { NotificationRequest } from "expo-notifications";
import { GridItem } from "../../components/GridItem/GridItem";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const List: React.FC = () => {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  const [notifications, setNotificationsList] = useState<NotificationRequest[]>(
    []
  );
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification);
  //     }
  //   );

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  async function schedulePushNotification(vehicle: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🛠️ ${vehicle} Alerta de manutenção periódica`,
        body: "Não se esqueça de verificar o óleo do veículo.",
        data: { data: "goes here" },
      },
      trigger: { seconds: 3, channelId: "keep-vehicle-notifications" },
    });
    get();
  }

  async function get() {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    setNotificationsList(response);
    console.log(response);
  }

  async function cancel(id: string) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Constants.isDevice) {
  //     const {
  //       status: existingStatus,
  //     } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // }

  return (
    <View style={styles.container}>
      <GridItem />
      {/* <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification("(Fiat Palio 2010)");
        }}
      />
      <Button title="List notifications" onPress={get} />
      <View style={{ marginTop: 50 }}>
        <Text>Notificacoes na fila</Text>
        {notifications.map((item) => (
          <View key={item.identifier}>
            <Text>{item.content.title}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131c21",
  },
});
