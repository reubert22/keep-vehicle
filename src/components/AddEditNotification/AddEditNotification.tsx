import React, { FC, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { VehicleType } from "../../utils/SharedTypes";
import { Colors } from "../../utils/Colors";

const { width } = Dimensions.get("window");

type AddEditNotificationPropType = {
  vehicle: VehicleType | null;
  onPressSaveOrEdit: (item: VehicleType, days: number) => void;
  onPressDelete: (item: VehicleType) => void;
  ntfDays?: number;
};

export const AddEditNotification: FC<AddEditNotificationPropType> = ({
  vehicle,
  onPressSaveOrEdit,
  onPressDelete,
  ntfDays = 0,
}) => {
  const [days, setDays] = useState(ntfDays);

  useEffect(() => {
    setDays(ntfDays);
  }, [ntfDays]);

  const addDay = () => setDays(days + 1);
  const removeDay = () => setDays(days === 0 ? days : days - 1);

  return (
    vehicle && (
      <View style={styles.container}>
        <View style={styles.containerTitleAndDelete}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>
              {ntfDays !== 0 ? "Editar notificação" : "Adicionar notificação"}
            </Text>
            <Text style={styles.vehicleTitle}>{vehicle.title}</Text>
          </View>
          {!!ntfDays && (
            <View style={styles.containerDeleteBtn}>
              <TouchableNativeFeedback
                style={styles.deleteBtn}
                disabled={days === 0}
                onPress={() => onPressDelete(vehicle)}
              >
                <Text style={styles.deleteBtnText}>Excluir</Text>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
        <View style={styles.containerSelectDays}>
          <Text style={styles.selectDaysText}>
            Escolha o tempo em dias para repetirmos a notificação:
          </Text>
          <View style={styles.containerSelect}>
            <TouchableNativeFeedback
              style={styles.removeDaysBtn}
              disabled={days === 0}
              onPress={removeDay}
            >
              <Text style={styles.removeAddText}>-</Text>
            </TouchableNativeFeedback>
            <View style={styles.containerInputDays}>
              <TextInput
                keyboardType="numeric"
                style={styles.inputDays}
                onChangeText={(text) => {
                  setDays(Number(text));
                }}
                value={days.toString()}
              />
            </View>
            <TouchableNativeFeedback style={styles.addDaysBtn} onPress={addDay}>
              <Text style={styles.removeAddText}>+</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.containerSaveBtn}>
          <TouchableNativeFeedback
            style={styles.saveBtn}
            disabled={days === 0}
            onPress={() => onPressSaveOrEdit(vehicle, days)}
          >
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBlue,
    padding: 20,
    height: 450,
    width,
  },
  containerTitleAndDelete: {
    width: "100%",
    flexDirection: "row",
  },
  containerTitle: { width: "80%" },
  title: { fontSize: 22, color: Colors.tertiaryBlue },
  vehicleTitle: {
    color: Colors.primaryWhite,
    fontSize: 16,
    marginTop: 5,
  },
  containerDeleteBtn: { width: "20%" },
  deleteBtn: {
    borderRadius: 10,
    backgroundColor: Colors.tertiaryBlue,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  deleteBtnText: { fontSize: 14, color: Colors.quaternaryBlue },
  containerSelectDays: {
    marginTop: 35,
  },
  selectDaysText: { color: Colors.primaryWhite },
  containerSelect: {
    marginTop: 10,
    borderRadius: 15,
    alignItems: "center",
    height: 40,
    flexDirection: "row",
  },
  removeDaysBtn: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.quaternaryBlue,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  containerInputDays: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.quaternaryBlue,
    height: "100%",
  },
  inputDays: {
    height: 40,
    width: "100%",
    textAlign: "center",
    color: Colors.white,
  },
  addDaysBtn: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.quaternaryBlue,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  containerSaveBtn: { marginTop: 25, height: 40 },
  saveBtn: {
    borderRadius: 10,
    backgroundColor: Colors.quaternaryBlue,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  saveText: { fontSize: 16, color: Colors.tertiaryBlue },
  removeAddText: { fontSize: 22, color: Colors.tertiaryBlue },
});
