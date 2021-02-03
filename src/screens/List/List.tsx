import React, { useState, useEffect, FC } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from "react-native";
import { NotificationRequest } from "expo-notifications";
import {
  GridItem,
  GridItemTypeProps,
} from "../../components/GridItem/GridItem";
import { vehiclesInfo } from "../../utils/WelcomeInfo";
import { getData, AsyncStorageKeys, storeData } from "../../utils/AsyncStorage";
import {
  scheduleNotification,
  getAllScheduleNotifications,
  cancelAllScheduleNotifications,
} from "../../utils/Notification";
import BottomSheet from "reanimated-bottom-sheet";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const Header = () => (
  <View style={{ height: 30, alignItems: "center", justifyContent: "center" }}>
    <View
      style={{
        width: 30,
        backgroundColor: "#cecece",
        height: 5,
        borderRadius: 100,
      }}
    />
  </View>
);

const Content = ({
  vehicle,
  onPressSave,
}: {
  vehicle: GridItemTypeProps | null;
  onPressSave: (item: GridItemTypeProps, days: number) => void;
}) => {
  const [days, setDays] = useState(0);

  const addDay = () => setDays(days + 1);
  const removeDay = () => setDays(days === 0 ? days : days - 1);
  return (
    vehicle && (
      <View
        style={{
          backgroundColor: "#1f292e",
          padding: 20,
          height: 450,
          width,
        }}
      >
        <Text style={{ fontSize: 22, color: "#34bff1" }}>
          Adicionar notificação
        </Text>
        <Text
          style={{
            color: "rgba(241, 241, 242, 0.92)",
            fontSize: 16,
            marginTop: 5,
          }}
        >
          {vehicle.title}
        </Text>
        <View
          style={{
            marginTop: 35,
          }}
        >
          <Text style={{ color: "rgba(241, 241, 242, 0.92)" }}>
            Escolha o tempo em dias para repetirmos a notificação:
          </Text>
          <View
            style={{
              marginTop: 10,
              borderRadius: 15,
              alignItems: "center",
              height: 40,
              flexDirection: "row",
            }}
          >
            <TouchableNativeFeedback
              style={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: "#2c414d",
                width: 64,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
              disabled={days === 0}
              onPress={removeDay}
            >
              <Text style={{ fontSize: 22, color: "#34bff1" }}>-</Text>
            </TouchableNativeFeedback>
            <View
              style={{
                width: "60%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#2c414d",
                height: "100%",
              }}
            >
              <TextInput
                keyboardType="numeric"
                style={{
                  height: 40,
                  width: "100%",
                  textAlign: "center",
                  color: "#FFF",
                }}
                onChangeText={(text) => {
                  setDays(Number(text));
                }}
                value={days.toString()}
              />
            </View>
            <TouchableNativeFeedback
              style={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: "#2c414d",
                width: 64,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
              onPress={addDay}
            >
              <Text style={{ fontSize: 22, color: "#34bff1" }}>+</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{ marginTop: 25, height: 40 }}>
          <TouchableNativeFeedback
            style={{
              borderRadius: 10,
              backgroundColor: "#2c414d",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            onPress={() => onPressSave(vehicle, days)}
          >
            <Text style={{ fontSize: 16, color: "#34bff1" }}>Salvar</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  );
};

export const List: FC = () => {
  const sheetRef = React.useRef(null);
  const [notifications, setNotificationsList] = useState<NotificationRequest[]>(
    []
  );
  const [vehicles, setVehicles] = useState<GridItemTypeProps[]>([]);
  const [
    selectedVehicle,
    setSelectedVehicle,
  ] = useState<GridItemTypeProps | null>(null);
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
    get();
  }, [loading]);

  useEffect(() => {
    if (selectedVehicle) {
      //@ts-ignore
      sheetRef?.current?.snapTo(320);
    }
  }, [selectedVehicle]);

  const handleAddNotificationForVehicle = (
    vehicle: GridItemTypeProps,
    notification: string
  ) => {
    const newVehicles = vehicles.map((item: GridItemTypeProps) => {
      if (vehicle.id === item.id) {
        return Object.assign(item, {
          notification,
        });
      }
      return item;
    });
    setVehicles(newVehicles);
    storeData(AsyncStorageKeys.VEHICLE_LIST, newVehicles);
  };

  const schedulePushNotification = async (
    vehicle: GridItemTypeProps,
    days: number
  ) => {
    const response = await getAllScheduleNotifications();
    setNotificationsList(response);
    const x = response.filter((item) => item.content.data.id === vehicle.id);
    if (x.length === 0) {
      const identifier = await scheduleNotification({
        content: {
          title: `🛠️ ${vehicle.title} Alerta de manutenção periódica`,
          body: "Não se esqueça de verificar o óleo do veículo.",
          data: { id: vehicle.id },
        },
        trigger: {
          seconds: 86400 * days,
          repeats: true,
          channelId: "keep-vehicle-notifications",
        },
      });
      handleAddNotificationForVehicle(vehicle, identifier);
      get();
    }
  };

  const get = async () => {
    const response = await getAllScheduleNotifications();
    setNotificationsList(response);
  };

  async function cancelAll() {
    await cancelAllScheduleNotifications();
  }

  return (
    <View style={styles.container}>
      <Button title="Add vehicles mock to async" onPress={addVehiclesMock} />
      <Button title="Cancel ntf" onPress={cancelAll} />
      {vehicles.map((item: GridItemTypeProps) => (
        <GridItem
          key={`vehicle-${item.title}`}
          {...item}
          addVehicleNotification={() => setSelectedVehicle(item)} //schedulePushNotification(item)}
        />
      ))}
      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      <View style={{ marginTop: 50 }}>
        <Text>Notificacoes na fila</Text>
        {notifications.map((item) => (
          <View key={item.identifier}>
            <Text>{item.content.title}</Text>
          </View>
        ))}
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 320]}
        borderRadius={10}
        renderContent={() => (
          <Content
            vehicle={selectedVehicle}
            onPressSave={(item, days) => schedulePushNotification(item, days)}
          />
        )}
        onCloseEnd={() => setSelectedVehicle(null)}
        renderHeader={() => <Header />}
        enabledContentGestureInteraction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131c21",
  },
});
