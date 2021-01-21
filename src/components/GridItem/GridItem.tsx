import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";

const { width } = Dimensions.get("window");

export const GridItem = () => (
  <TouchableHighlight>
    <View style={styles.containerGridItem}>
      <View style={styles.containerContentImg}>
        <View style={styles.contentImg}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{
              uri: "https://pngimg.com/uploads/mercedes/mercedes_PNG80135.png",
            }}
          />
        </View>
      </View>
      <View style={styles.containerInfo}>
        <View>
          <Text numberOfLines={1} style={styles.infoTitle}>
            Fiat Palio
          </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.moreInfo}>
            2010/2011 - Gasolina
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  containerGridItem: {
    width: width * 0.97,
    height: 72,
    flexDirection: "row",
  },
  containerContentImg: {
    width: "20%",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  contentImg: {
    height: 49,
    width: 49,
    backgroundColor: "#131c21",
    borderRadius: 24.5,
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 24.5,
    position: "relative",
    overflow: "hidden",
  },
  containerInfo: {
    paddingRight: 15,
    width: "80%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#30383d",
    flexDirection: "column",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
    color: "rgba(241, 241, 242, 0.92)",
  },
  moreInfo: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "rgba(241, 241, 242, 0.63)",
  },
});
