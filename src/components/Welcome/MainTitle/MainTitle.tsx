import React, { FC } from "react";
import { StyleSheet, View, Dimensions, Animated, Text } from "react-native";

const { width } = Dimensions.get("window");
const TITLE_HEIGHT = 40;

type MainTitlePropType = {
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

export const MainTitle: FC<MainTitlePropType> = ({ scrollX, data }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TITLE_HEIGHT, 0, -TITLE_HEIGHT],
  });

  return (
    <View style={styles.titleContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ mainTitle, key }) => (
          <Text key={`${key}-main-title`} style={styles.mainTitle}>
            {mainTitle}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    top: 10,
    overflow: "hidden",
    height: TITLE_HEIGHT,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: TITLE_HEIGHT,
    lineHeight: TITLE_HEIGHT,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "rgba(241, 241, 242, 0.92)",
    letterSpacing: 2,
  },
});
