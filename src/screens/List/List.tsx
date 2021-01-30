import React, { useState, useEffect, FC } from "react";
import * as Notifications from "expo-notifications";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { NotificationRequest } from "expo-notifications";
import {
  GridItem,
  GridItemTypeProps,
} from "../../components/GridItem/GridItem";
import { vehiclesInfo } from "../../utils/WelcomeInfo";
import { getData, AsyncStorageKeys, storeData } from "../../utils/AsyncStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const List: FC = () => {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  const [notifications, setNotificationsList] = useState<NotificationRequest[]>(
    []
  );
  const [vehicles, setVehicles] = useState<GridItemTypeProps[]>([]);
  const [loading, setLoading] = useState(false);

  const getVehicles = async () => {
    const response = await getData(AsyncStorageKeys.VEHICLE_LIST);
    setVehicles(response ? response : []);
    setLoading(false);
  };

  const addVehiclesMock = async () => {
    setLoading(true);
    storeData(AsyncStorageKeys.VEHICLE_LIST, vehiclesInfo);
  };

  useEffect(() => {
    getVehicles();
  }, [loading]);

  const handleAddNotificationForVehicle = (vehicle: GridItemTypeProps) => {
    const newVehicles = vehicles.map((item: GridItemTypeProps) => {
      if (vehicle.id === item.id) {
        return Object.assign(item, {
          notification: "1",
        });
      }
      return item;
    });
    setVehicles(newVehicles);
    storeData(AsyncStorageKeys.VEHICLE_LIST, newVehicles);
    schedulePushNotification(vehicle);
  };

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

  async function schedulePushNotification(vehicle: GridItemTypeProps) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🛠️ ${vehicle.title} Alerta de manutenção periódica`,
        body: "Não se esqueça de verificar o óleo do veículo.",
        data: { data: "goes here" },
      },
      // days / 2
      trigger: { seconds: 86400, channelId: "keep-vehicle-notifications" },
      //   trigger: { seconds: 180, channelId: "keep-vehicle-notifications" },
    });
    get();
  }

  async function get() {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    setNotificationsList(response);
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
      {vehicles.map((item: GridItemTypeProps) => (
        <GridItem
          key={`vehicle-${item.title}`}
          {...item}
          addVehicleNotification={() => handleAddNotificationForVehicle(item)}
        />
      ))}
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      <Button title="Add vehicles mock to async" onPress={addVehiclesMock} />
      <View style={{ marginTop: 50 }}>
        <Text>Notificacoes na fila</Text>
        {notifications.map((item) => (
          <View key={item.identifier}>
            <Text>{item.content.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131c21",
  },
});
