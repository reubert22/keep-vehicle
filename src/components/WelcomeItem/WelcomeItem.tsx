import React, { FC } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

type WelcomeItemPropsType = {
  item: {
    uri: string;
    key: string;
    title: string;
    mainTitle: string;
    description: string;
    indicatorColor: string;
  };
  index: number;
  scrollX: Animated.Value;
};

export const WelcomeItem: FC<WelcomeItemPropsType> = ({
  item,
  index,
  scrollX,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateXTitle = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.2, 0, -width * 0.2],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.6, 0, -width * 0.6],
  });

  const opacity = scrollX.interpolate({
    inputRange: [(index - 0.3) * width, index * width, (index + 0.3) * width],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.containerItem}>
      <View style={styles.containerImage}>
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.image,
            {
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}
          source={{ uri: item.uri }}
        />
      </View>
      <View style={styles.containerTexts}>
        <Animated.Text
          style={[
            styles.title,
            { opacity, transform: [{ translateX: translateXTitle }] },
          ]}
        >
          {item.title}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            { opacity, transform: [{ translateX: translateXDescription }] },
          ]}
        >
          {item.description}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    width,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerImage: {
    width,
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.8,
    height: height / 2,
    borderRadius: 20,
  },
  containerTexts: {
    minHeight: height * 0.3,
    width: width * 0.8,
  },
  title: {
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#595959",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  description: {
    fontSize: 19,
    fontWeight: "400",
    letterSpacing: 1.5,
    color: "#a8a7a7",
  },
});
