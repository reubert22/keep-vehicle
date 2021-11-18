import React, { FC, useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert, Button } from "react-native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Colors } from "../../utils/Colors";
import { Header } from "../../components/Header/Headers";
import { TextField } from "../../components/Shared/TextField/TextField";

const { width } = Dimensions.get("window");

const fieldsValidationSchema = yup.object().shape({
  Nome: yup.string().required("O nome não pode ser vazio"),
});

export const CreateVehicle: FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fieldsValidationSchema),
  });

  useEffect(() => {
    register("Nome");
  }, [register]);
  const onSubmit = (data: { Nome: string }) => Alert.alert(data.Nome);

  return (
    <View style={styles.container}>
      <Header mainTitle="Cadastrar veículo" />
      <View style={styles.constainerContent}>
        <View style={{ height: 60, paddingHorizontal: 10 }}>
          <TextField
            label="Nome"
            error={errors?.Nome}
            onChangeText={(text: string) => setValue("Nome", text)}
            inputProps={{
              placeholder: "Nome",
              placeholderTextColor: Colors.primaryWhite,
            }}
          />
          <TextField
            label="Ano"
            onChangeText={(text: string) => setValue("Ano", text)}
            inputProps={{
              keyboardType: "numeric",
              placeholder: "Ano",
              placeholderTextColor: Colors.primaryWhite,
              maxLength: 4,
            }}
          />
          <TextField
            label="Combustível"
            onChangeText={(text: string) => setValue("Combustível", text)}
            inputProps={{
              placeholder: "Combustível",
              placeholderTextColor: Colors.primaryWhite,
            }}
          />
          <Button onPress={handleSubmit(onSubmit)} title="Continuar" />
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
