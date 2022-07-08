import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";
import Task from "./components/Task";

export default function App() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const days = [
    "Nedeľa",
    "Pondelok",
    "Utorok",
    "Streda",
    "Štvrtok",
    "Piatok",
    "Sobota",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Máj",
    "Jún",
    "Júl",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? "pm" : "am";

      setTime(
        (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes) +
          ampm
      );

      setDate(days[day] + ", " + date + ". " + months[month]);
    }, 1000);
  }, []);

  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const handleCompleteTask = (id) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(id, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.bgImage}
      >
        <View style={styles.tasksWrapper}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Môj deň</Text>
            <Text style={styles.subTitle}>{date}</Text>
          </View>

          {/* Daily Tasks */}
          <View style={styles.items}>
            {taskItems.map((item, id) => {
              return (
                <TouchableOpacity
                  onPress={() => handleCompleteTask(id)}
                  key={id}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Add your task */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.addTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Pridať úlohu"
            value={task}
            onChangeText={(text) => setTask(text)}
          />

          <TouchableOpacity onPress={() => handleAddTask()}>
            {task !== "" ? (
              <View style={styles.addWrapper}>
                <Text>+</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
    backgroundColor: "rgba(46,104,129, 0.8)",
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#fff",
  },
  items: {
    marginTop: 30,
  },
  addTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
