import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  Button,
} from "react-native";

const { width } = Dimensions.get("window");

type GridItemTypeProps = {
  id: number;
  title: string;
  img: string;
  moreDetails: string;
  notification?: string;
  days?: number;
  onPress: (id: number) => void;
};

export const GridItem = ({
  img,
  title,
  moreDetails,
  notification,
  onPress,
  id,
}: GridItemTypeProps) => (
  <TouchableHighlight>
    <View style={styles.containerGridItem}>
      <View style={styles.containerContentImg}>
        <View style={styles.contentImg}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{
              uri: img,
            }}
          />
        </View>
      </View>
      <View style={styles.containerInfo}>
        <View>
          <View>
            <Text numberOfLines={1} style={styles.infoTitle}>
              {title}
            </Text>
          </View>
          <View style={styles.containerNotificationOnList}>
            <Text numberOfLines={1} style={styles.moreInfo}>
              {moreDetails}
            </Text>
          </View>
        </View>
        <View style={styles.containerNotificationBtns}>
          {notification ? (
            <TouchableHighlight
              style={[styles.notificationAddBtn, styles.notificationEditBtn]}
              onPress={() => onPress(id)}
            >
              <Text style={styles.plusText}>...</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={styles.notificationAddBtn}
              onPress={() => onPress(id)}
            >
              <Text style={styles.plusText}>+</Text>
            </TouchableHighlight>
          )}
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
    paddingLeft: 13,
    paddingRight: 15,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  containerNotificationOnList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNotificationBtns: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationAddBtn: {
    borderColor: "#34bff1",
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationEditBtn: {
    justifyContent: "flex-start",
  },
  plusText: { color: "#FFF" },
});
