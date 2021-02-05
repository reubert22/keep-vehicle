import React, { useState, useEffect, FC } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { GridItem } from "../../components/GridItem/GridItem";
import { vehiclesInfo } from "../../utils/WelcomeInfo";
import { getData, AsyncStorageKeys, storeData } from "../../utils/AsyncStorage";
import {
  scheduleNotification,
  getAllScheduleNotifications,
  cancelAllScheduleNotifications,
  editNotificationDaysToRepeat,
  cancelScheduledNotification,
} from "../../utils/Notification";
import BottomSheet from "reanimated-bottom-sheet";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

type VehicleType = {
  id: number;
  title: string;
  img: string;
  moreDetails: string;
  notification?: string;
  days?: number;
};

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
  onPressSaveOrEdit,
  onPressDelete,
  ntfDays = 0,
}: {
  vehicle: VehicleType | null;
  onPressSaveOrEdit: (item: VehicleType, days: number) => void;
  onPressDelete: (item: VehicleType) => void;
  ntfDays?: number;
}) => {
  const [days, setDays] = useState(ntfDays);

  useEffect(() => {
    setDays(ntfDays);
  }, [ntfDays]);

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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: 22, color: "#34bff1" }}>
              {ntfDays !== 0 ? "Editar notificação" : "Adicionar notificação"}
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
          </View>
          {!!ntfDays && (
            <View style={{ width: "20%" }}>
              <TouchableNativeFeedback
                style={{
                  borderRadius: 10,
                  backgroundColor: "#34bff1",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                }}
                disabled={days === 0}
                onPress={() => onPressDelete(vehicle)}
              >
                <Text style={{ fontSize: 14, color: "#2c414d" }}>Excluir</Text>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
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
            disabled={days === 0}
            onPress={() => onPressSaveOrEdit(vehicle, days)}
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
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const getVehicles = async () => {
    const response = await getData(AsyncStorageKeys.VEHICLE_LIST);
    setVehicles(response ? response : []);
    setLoading(false);
  };

  const addVehiclesMock = async () => {
    setLoading(true);
    AsyncStorage.removeItem(AsyncStorageKeys.VEHICLE_LIST);
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
    vehicle: VehicleType,
    notification: string,
    days: number
  ) => {
    const newVehicles = vehicles.map((item: VehicleType) => {
      if (vehicle.id === item.id) {
        return Object.assign(item, {
          days,
          notification,
        });
      }
      return item;
    });
    setVehicles(newVehicles);
    storeData(AsyncStorageKeys.VEHICLE_LIST, newVehicles);
  };

  const handleRemoveNotificationFromVehicle = (id: number) => {
    const newVehicles = vehicles.map((item: VehicleType) => {
      if (id === item.id) {
        return {
          id: item.id,
          title: item.title,
          img: item.img,
          moreDetails: item.moreDetails,
        };
      }
      return item;
    });
    setVehicles(newVehicles);
    storeData(AsyncStorageKeys.VEHICLE_LIST, newVehicles);
  };

  const deleteNotification = async (vehicle: VehicleType) => {
    if (vehicle.notification) {
      await cancelScheduledNotification(vehicle.notification);
      handleRemoveNotificationFromVehicle(vehicle.id);

      get();
      setSelectedVehicle(null);
      //@ts-ignore
      sheetRef?.current?.snapTo(0);
    }
  };

  const editScheduledNotification = async (
    vehicle: VehicleType,
    days: number
  ) => {
    if (vehicle.notification) {
      const identifier = await editNotificationDaysToRepeat(
        vehicle.notification,
        {
          content: {
            title: `🛠️ ${vehicle.title} Alerta de manutenção periódica`,
            body: "Não se esqueça de verificar o óleo do veículo.",
            data: { id: vehicle.id, repeatsIn: days },
          },
          trigger: {
            seconds: 86400 * days,
            repeats: true,
            channelId: "keep-vehicle-notifications",
          },
        }
      );
      handleAddNotificationForVehicle(vehicle, identifier, days);
      get();

      setSelectedVehicle(null);
      //@ts-ignore
      sheetRef?.current?.snapTo(0);
    }
  };

  const schedulePushNotification = async (
    vehicle: VehicleType,
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
          data: { id: vehicle.id, repeatsIn: days },
        },
        trigger: {
          seconds: 86400 * days,
          repeats: true,
          channelId: "keep-vehicle-notifications",
        },
      });
      handleAddNotificationForVehicle(vehicle, identifier, days);
      get();

      setSelectedVehicle(null);
      //@ts-ignore
      sheetRef?.current?.snapTo(0);
    }
  };

  const get = async () => {
    const response = await getAllScheduleNotifications();
    setNotificationsList(response);
  };

  return (
    <View style={styles.container}>
      <Button title="Add vehicles mock to async" onPress={addVehiclesMock} />
      {vehicles.map((item: VehicleType) => (
        <GridItem
          key={`vehicle-${item.title}`}
          {...item}
          onPress={() => {
            setSelectedVehicle(item);
          }}
        />
      ))}
      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      <View style={{ marginTop: 50 }}>
        <Text style={{ color: "#FFF", textAlign: "center" }}>
          Notificacoes na fila
        </Text>
        {notifications.map((item) => (
          <View key={item.identifier}>
            <Text style={{ color: "#FFF" }}>
              {item.content.title} - Repete a cada {item.content.data.repeatsIn}{" "}
              dia(s)
            </Text>
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
            onPressSaveOrEdit={(item, days) =>
              selectedVehicle?.days
                ? editScheduledNotification(item, days)
                : schedulePushNotification(item, days)
            }
            onPressDelete={(item) => deleteNotification(item)}
            ntfDays={selectedVehicle?.days ? selectedVehicle.days : 0}
          />
        )}
        onCloseEnd={() => setSelectedVehicle(null)}
        renderHeader={() => <Header />}
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
