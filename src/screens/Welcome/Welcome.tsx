import React, { useRef, FC } from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";

import { BackgroundCircle } from "../../components/Welcome/BackgroundCircle/BackgroundCircle";
import { Indicator } from "../../components/Welcome/Indicator/Indicator";
import { MainTitle } from "../../components/Welcome/MainTitle/MainTitle";
import { Item } from "../../components/Welcome/Item/Item";
import { welcomeInfo } from "../../utils/WelcomeInfo";

const { width, height } = Dimensions.get("window");

type WelcomePropType = {
  onPress: () => void;
};

export const Welcome: FC<WelcomePropType> = ({ onPress }) => {
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
          <Item onPress={onPress} item={item} index={index} scrollX={scrollX} />
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
    backgroundColor: "#131C21",
    alignItems: "center",
    justifyContent: "center",
    height,
    width,
  },
});
