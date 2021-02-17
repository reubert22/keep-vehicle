import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { Colors } from "../../utils/Colors";
import { Header } from "../../components/Header/Headers";

const { width } = Dimensions.get("window");

export const CreateVehicle: FC = () => {
  const [value, setValue] = useState<string>("");
  return (
    <View style={styles.container}>
      <Header mainTitle="Cadastrar veículo" />
      <View style={styles.constainerContent}>
        <View style={{ height: 60, paddingHorizontal: 10 }}>
          <Text style={{ color: "#FFF" }}>Label</Text>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.inputDays}
              onChangeText={(text) => setValue(text)}
              value={value}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
  },
  constainerContent: {
    position: "absolute",
    top: 50,
    paddingVertical: 10,
    height: "100%",
    width,
    backgroundColor: Colors.primaryBlue,
  },
  containerInput: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.quaternaryBlue,
  },
  inputDays: {
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 40,
    width: "100%",
    color: Colors.white,
  },
});
