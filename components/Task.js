import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-web";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circle}>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "rgb(46,104,129)",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 12,
  },
  itemText: {
    maxWidth: "80%",
  },
  circle: {
    width: 12,
    height: 12,
    borderColor: "rgb(46,104,129)",
    borderWidth: 2,
    borderRadius: 5,
  },
});
