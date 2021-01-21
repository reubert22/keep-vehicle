import React, { FC } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");
const IndicatorWidth = 25;
const IndicatorHeight = 25;

type IndicatorPropsType = {
  scrollX: Animated.Value;
  data: {
    uri: string;
    key: string;
    title: string;
    description: string;
    indicatorColor: string;
  }[];
};

export const Indicator: FC<IndicatorPropsType> = ({ scrollX, data }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-IndicatorWidth, 0, IndicatorWidth + 10],
  });

  return (
    <View style={styles.indicatorContainer}>
      <Animated.View
        style={[styles.outsideIndicator, { transform: [{ translateX }] }]}
      />
      {data.map(({ indicatorColor, key }) => (
        <Animated.View
          key={`${key}-circle-indicator`}
          style={styles.containerIndicator}
        >
          <Animated.View
            style={[styles.indicator, { backgroundColor: indicatorColor }]}
          />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    height: 50,
    flexDirection: "row",
    bottom: 0,
  },
  outsideIndicator: {
    borderWidth: 1,
    position: "absolute",
    width: IndicatorWidth,
    borderRadius: IndicatorWidth / 2,
    height: IndicatorHeight,
    marginHorizontal: 5,
    borderColor: "rgba(241, 241, 242, 0.63)",
    alignItems: "center",
    justifyContent: "center",
  },
  containerIndicator: {
    width: IndicatorWidth,
    height: IndicatorHeight,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderColor: "#a8a7a7",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
