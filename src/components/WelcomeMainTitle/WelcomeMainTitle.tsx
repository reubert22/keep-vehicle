import React, { FC } from "react";
import { StyleSheet, View, Dimensions, Animated, Text } from "react-native";

const { width } = Dimensions.get("window");

type WelcomeMainTitlePropType = {
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

const TITLE_HEIGHT = 40;
export const WelcomeMainTitle: FC<WelcomeMainTitlePropType> = ({
  scrollX,
  data,
}) => {
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
    left: 10,
    overflow: "hidden",
    height: TITLE_HEIGHT,
  },
  mainTitle: {
    fontSize: TITLE_HEIGHT,
    lineHeight: TITLE_HEIGHT,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
