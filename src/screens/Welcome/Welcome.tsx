import React, { useRef } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

import { Indicator } from "../../components/Welcome/Indicator/Indicator";
import { Item } from "../../components/Welcome/Item/Item";
import { welcomeInfo } from "../../utils/WelcomeInfo";
import { MainTitle } from "../../components/Welcome/MainTitle/MainTitle";
import { BackgroundCircle } from "../../components/Welcome/BackgroundCircle/BackgroundCircle";

const { width, height } = Dimensions.get("window");

export const Welcome = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <BackgroundCircle scrollX={scrollX} data={welcomeInfo} />
      <Animated.FlatList
        keyExtractor={(item: string) => item.key}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        data={welcomeInfo}
        renderItem={({ item, index }) => (
          <Item item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Indicator scrollX={scrollX} data={welcomeInfo} />
      <MainTitle scrollX={scrollX} data={welcomeInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    height,
    width,
  },
});
