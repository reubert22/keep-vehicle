import React from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

import { Indicator } from "../../components/Indicator/Indicator";
import { WelcomeItem } from "../../components/WelcomeItem/WelcomeItem";
import { welcomeInfo } from "../../utils/WelcomeInfo";

const { width, height } = Dimensions.get("window");

export const Welcome = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        keyExtractor={(item: string) => item.key}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        data={welcomeInfo}
        renderItem={({ item, index }) => (
          <WelcomeItem item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Indicator scrollX={scrollX} data={welcomeInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height,
    width,
  },
});
