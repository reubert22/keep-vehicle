import React, { FC } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.6;

type WelcomeBackgroundCirclePropType = {
  scrollX: Animated.Value;
  data: Array<{
    uri: string;
    key: string;
    mainTitle: string;
    title: string;
    description: string;
    indicatorColor: string;
  }>;
};

export const WelcomeBackgroundCircle: FC<WelcomeBackgroundCirclePropType> = ({
  scrollX,
  data,
}) => (
  <View style={[StyleSheet.absoluteFillObject, styles.containerCircle]}>
    {data.map(({ indicatorColor, key }, index) => {
      const inputRange = [
        (index - 0.55) * width,
        index * width,
        (index + 0.55) * width,
      ];
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
        extrapolate: "clamp",
      });
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0, 0.3, 0],
      });
      return (
        <Animated.View
          key={`${key}-welcome-background-circle`}
          style={[
            styles.circle,
            {
              backgroundColor: indicatorColor,
              opacity,
              transform: [{ scale }],
            },
          ]}
        ></Animated.View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  containerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    top: 80,
  },
});
