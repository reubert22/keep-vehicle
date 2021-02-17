import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../utils/Colors";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

type HeaderPropTypes = {
  mainTitle?: string;
};

export const Header: FC<HeaderPropTypes> = ({ mainTitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.sideContainers}>
        <TouchableNativeFeedback
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text numberOfLines={1} style={styles.centralHeaderText}>
            Voltar
          </Text>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.containerCentral}>
        {!!mainTitle && (
          <Text numberOfLines={1} style={styles.centralHeaderTitleText}>
            {mainTitle}
          </Text>
        )}
      </View>
      <View style={styles.sideContainers}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    backgroundColor: Colors.secondaryBlue,
  },
  sideContainers: { width: "20%", height: "100%", padding: 10 },
  backBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  containerCentral: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  centralHeaderText: {
    paddingHorizontal: 5,
    color: Colors.white,
  },
  centralHeaderTitleText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    color: "#FFF",
    paddingHorizontal: 5,
  },
});
