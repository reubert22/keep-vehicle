import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationRequest } from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import { GridItem } from '../../components/GridItem/GridItem';
import { vehiclesInfo } from '../../utils/WelcomeInfo';
import { getData, AsyncStorageKeys, storeData } from '../../utils/AsyncStorage';
import {
  scheduleNotification,
  getAllScheduleNotifications,
  editNotificationDaysToRepeat,
  cancelScheduledNotification,
} from '../../utils/Notification';
import { Header } from '../../components/BottomSheet/Header/Header';
import { AddEditNotification } from '../../components/AddEditNotification/AddEditNotification';
import { VehicleType } from '../../utils/SharedTypes';
import { Colors } from '../../utils/Colors';

export const List: FC = () => {
  const navigation = useNavigation();
  const sheetRef = React.useRef(null);
  const [notifications, setNotificationsList] = useState<NotificationRequest[]>([]);
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const handleOpenBottomSheet = () => sheetRef?.current?.snapTo(320);
  // @ts-ignore
  const handleCloseBottomSheet = () => sheetRef?.current?.snapTo(0);

  const handleCloseBottomSheetAndClearSelectedVehicle = () => {
    setSelectedVehicle(null);
    handleCloseBottomSheet();
  };

  useEffect(() => {
    if (selectedVehicle) {
      handleOpenBottomSheet();
    }
  }, [selectedVehicle]);

  const getVehicles = async () => {
    const response = await getData(AsyncStorageKeys.VEHICLE_LIST);
    setVehicles(response || []);
    setLoading(false);
  };

  const addVehiclesMock = () => {
    setLoading(true);
    AsyncStorage.removeItem(AsyncStorageKeys.VEHICLE_LIST);
    storeData(AsyncStorageKeys.VEHICLE_LIST, vehiclesInfo);
  };

  const get = async () => {
    const response = await getAllScheduleNotifications();
    setNotificationsList(response);
  };

  useEffect(() => {
    getVehicles();
    get();
  }, [loading]);

  const handleAddNotificationForVehicle = (
    vehicle: VehicleType,
    notification: string,
    days: number,
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
      handleCloseBottomSheetAndClearSelectedVehicle();
    }
  };

  const editScheduledNotification = async (vehicle: VehicleType, days: number) => {
    if (vehicle.notification) {
      const identifier = await editNotificationDaysToRepeat(vehicle.notification, {
        content: {
          title: `🛠️ ${vehicle.title} Alerta de manutenção periódica`,
          body: 'Não se esqueça de verificar o óleo do veículo.',
          data: { id: vehicle.id, repeatsIn: days },
        },
        trigger: {
          seconds: 86400 * days,
          repeats: true,
          channelId: 'keep-vehicle-notifications',
        },
      });
      handleAddNotificationForVehicle(vehicle, identifier, days);
      get();

      handleCloseBottomSheetAndClearSelectedVehicle();
    }
  };

  const schedulePushNotification = async (vehicle: VehicleType, days: number) => {
    const response = await getAllScheduleNotifications();
    setNotificationsList(response);
    const x = response.filter((item) => item.content.data.id === vehicle.id);
    if (x.length === 0) {
      const identifier = await scheduleNotification({
        content: {
          title: `🛠️ ${vehicle.title} Alerta de manutenção periódica`,
          body: 'Não se esqueça de verificar o óleo do veículo.',
          data: { id: vehicle.id, repeatsIn: days },
        },
        trigger: {
          seconds: 86400 * days,
          repeats: true,
          channelId: 'keep-vehicle-notifications',
        },
      });
      handleAddNotificationForVehicle(vehicle, identifier, days);
      get();

      handleCloseBottomSheetAndClearSelectedVehicle();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          <Text style={{ color: Colors.white, textAlign: 'center' }}>Notificacoes na fila</Text>
          {notifications.map((item) => (
            <View key={item.identifier}>
              <Text style={{ color: Colors.white }}>
                {item.content.title} - Repete a cada {item.content.data.repeatsIn} dia(s)
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 320]}
        borderRadius={10}
        renderContent={() => (
          <AddEditNotification
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
      <View style={styles.containerFab}>
        <TouchableNativeFeedback
          style={styles.fabBtn}
          useForeground
          onPress={() => navigation.navigate('CreateVehicle')}>
          <Text style={styles.fabBtnText}>+</Text>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
  },
  containerFab: {
    backgroundColor: Colors.quaternaryBlue,
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    borderRadius: 30,
    paddingBottom: 3,
  },
  fabBtn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabBtnText: { color: Colors.white, fontSize: 30 },
});
