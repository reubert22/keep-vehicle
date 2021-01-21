import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

type InitButtonPropsType = {
  onPress: () => void;
  index: number;
  scrollX: Animated.Value;
};

export const InitButton: FC<InitButtonPropsType> = ({
  onPress,
  index,
  scrollX,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [width, 0, -width],
  });

  const opacity = scrollX.interpolate({
    inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View
      style={[styles.buttonContainer, { opacity, transform: [{ translateX }] }]}
    >
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.textButton}>Iniciar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    height: 42,
    width: width * 0.8,
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#34bff1",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 17,
    letterSpacing: 0.5,
    fontWeight: "400",
    color: "#FFF",
  },
});
