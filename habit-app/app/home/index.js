import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Switch,
  useColorScheme,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons, Feather, EvilIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import {
  BottomModal,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
import { useFocusEffect } from "@react-navigation/native";



const Index = () => {

  {/*------CONSTANTS------*/ }
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [option, setOption] = useState("Today");
  const [habits, setHabits] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");


  {/*------FUNCTIONS------*/ }
  {/* Testing function for present day of week going in console// I only want 3 letters so using .slice*/ }
  const currentDay = "Fri";
  {/*const currentDay = new Date().toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3);*/}
  console.log(currentDay);

  useEffect(() => { fetchHabits(); }, []);
  {/*useCallback is used so that it only changes the function inside it only if changes are neccessary i.e. doesn't change the function with dependencies unless the dependencies change*/ }
  useFocusEffect(useCallback(() => { fetchHabits(); }, []));

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://192.168.1.246:3000/habitslist");
      setHabits(response.data); // Ensure response.data is an array
    } catch (error) {
      console.log("Error fetching habits from home/index:", error);
    }
  }

  {/* finds the selected habits and makes the Modal visible*/ }
  const handleLongPress = (habitId) => {
    const selectedHabit = habits?.find((habit) => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setModalVisible(true);
  }

  {/*Makes the completed habits disappear*/ }
  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true
      };

      // Correct the habitId variable name in the URL
      await axios.put(`http://192.168.1.246:3000/habits/${habitId}/completed`, { completed: updatedCompletion });

      // Fetch the updated list of habits after completion
      await fetchHabits();

      // Close the modal after completion
      setModalVisible(false);

    } catch (error) {
      console.log("Error updating habit completion:", error);
    }
  }

  {/*Fetch only the habits that have not been completed on present day*/ }
  const filteredHabits = habits?.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });

  {/*Deleting Habit */ }
  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;

      const response = await axios.delete(`http://192.168.1.246:3000/habits/${habitId}`);

      if (response.status === 200) {
        // Remove the deleted habit from the state
        setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== habitId));
        setModalVisible(false); // Close the modal after deletion
      }
    } catch (error) {
      console.log("Error deleting habit:", error);
    }
  };

    const getCompletedDays = (completedObj) => {
      if(completedObj && typeof completedObj === "object"){
          return Object.keys(completedObj).filter((day) => completedObj[day]);
      }

      return [];
  }

  // Toggle between dark and light mode manually
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const backgroundColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";


  console.log("Filtered Habits: ", filteredHabits);


  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  {/*Frontend*/ }
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: backgroundColor, padding: 15 }}>
        {/* Habits Text */}
        <Text style={{ marginVertical: 10, fontSize: 50, fontWeight: "500", color: textColor, textAlign: "center", fontFamily: "Times New Roman" }}>Habits</Text>
        {/* Top Row Flex (icon with the plus sign) */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>

          {/* Add Habits Button */}
          <Pressable
            onPress={() => router.push("/home/create")}
            style={{
              backgroundColor: '#0071C5', // Background color of the button
              borderRadius: 25, // Rounded corners
              paddingHorizontal: 15, // Horizontal padding inside the button
              paddingVertical: 10, // Vertical padding inside the button
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row', // Aligns items in a row
              gap: 10, // Space between the icon and text
            }}
          >
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: "Times New Roman" }}>+</Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', fontFamily: "Times New Roman" }}>Add Habit</Text>
          </Pressable>

          {/* Dark Mode Toggle */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isDarkMode ? (
              <Feather name="sun" size={24} color={"white"} onPress={toggleTheme} />
            ) : (
              <Feather name="moon" size={24} color={"black"} onPress={toggleTheme} />
            )}
          </View>
        </View>



        {/* Option Buttons */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 8, justifyContent: "center", }}>
          {/* Today Pressable */}
          <Pressable
            onPress={() => setOption("Today")}
            style={{
              backgroundColor: option === "Today" ? "#ADD8E6" : "transparent",
              paddingHorizontal: 10,
              paddingVertical: 8,
              
            }}>
            <Text style={{ textAlign: "center", color: "black", fontSize: 20, fontFamily: "Times New Roman" }}>Today</Text>
          </Pressable>

          {/* Weekly Pressable */}
          <Pressable
            onPress={() => setOption("Weekly")}
            style={{
              backgroundColor: option === "Weekly" ? "#ADD8E6" : "transparent",
              paddingHorizontal: 10,
              paddingVertical: 8, 
              
            }}>
            <Text style={{ fontFamily: "Times New Roman", textAlign: "center", color: "black", fontSize: 20 }}>Weekly</Text>
          </Pressable>

          {/* Overall Pressable */}
          <Pressable
            onPress={() => setOption("Overall")}
            style={{
              backgroundColor: option === "Overall" ? "#ADD8E6" : "transparent",
              paddingHorizontal: 10,
              paddingVertical: 8,
              
            }}>
            <Text style={{ fontFamily: "Times New Roman", textAlign: "center", color: "black", fontSize: 20 }}>Overall</Text>
          </Pressable>
        </View>

        {/* Showing all habits */}
        {/* onLongPress, the Modal becomes visible for each pressable habit */}
        
        {option === "Today" && (filteredHabits.length > 0 ? (
          <View>
            {filteredHabits?.map((item, index) => (
              <Pressable
                key={item._id} // Unique key prop using the habit's unique ID
                onLongPress={() => handleLongPress(item._id)}
                style={{
                  marginVertical: 15,
                  backgroundColor: item?.color,
                  padding: 12,
                  borderColor: "black", // Color of the outline
                  borderWidth: 5,      // Width of the outline
                  borderRadius: 8,     // Optional: Rounded corners for the outline
                }}
              >
                <Text style={{ fontFamily: "Times New Roman", textAlign: "center", fontWeight: "500", color: "white", fontSize: 25 }}>{item?.title} </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={{ marginTop: 150, justifyContent: "center", alignItems: "center", marginBottom: "auto" }}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600", marginTop: 10 }}>
              No Habits for Today. Create one?
            </Text>

            <Pressable
              onPress={() => router.push("/home/create")}
              style={{ backgroundColor: "#0071C5", marginTop: 20, paddingHorizontal: 20, paddingVertical: 10, marginLeft: "auto", marginRight: "auto" }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Create</Text>
            </Pressable>
          </View>
        ))}
        {option === "Weekly" && (
          <View>
            {/* Showing all habits */}
            {habits?.map((habit) => (
              <Pressable
                key={habit._id} // Unique key prop using the habit's unique ID
                style={{ marginVertical: 10, backgroundColor: habit.color, padding: 15, borderRadius: 24 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>{habit.title}</Text>
                  <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginVertical: 10 }}>
                  {days?.map((day) => {
                    const isCompleted = habit.completed && habit.completed[day];
                    console.log(`Habit: ${habit.title},Day: ${day}, Completed: ${isCompleted}, wtf: ${habit.completed[day]}`); // Debugging line
                    return (
                      <Pressable key={day} style={{ alignItems: "center" }}>
                        <Text style={{ color: "white" }}>{day}</Text>
                        {isCompleted ? (
                          <FontAwesome name="circle" size={24} color="black" style={{ marginTop: 12 }} />
                        ) : (
                          <Entypo name="circle" size={24} color="white" style={{ marginTop: 12 }} />
                        )}
                      </Pressable>
                    )
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}
        {option === "Overall" && (
          <View>
            {habits?.map((habit, index) => (
              <>
                <Pressable
                  style={{
                    marginVertical: 10,
                    backgroundColor: habit.color,
                    padding: 15,
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {habit.title}
                    </Text>
                    <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                  </View>


                </Pressable>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text>Completed On</Text>
                  <Text>{getCompletedDays(habit.completed).join(", ")}</Text>
                </View>
              </>
            ))}
          </View>
        )}
      </ScrollView>




      {/*bottom modal when long clicking on habits*/}
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ marginVertical: 10 }}>

            <Text>Options</Text>
            <Pressable onPress={handleCompletion} style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 15 }}>
              <Ionicons name="checkmark-circle-outline" size={24} color="black" />
              <Text>Completed</Text>
            </Pressable>

            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 15 }}>
              <Feather name="skip-forward" size={24} color="black" />
              <Text>Skip</Text>
            </Pressable>

            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 15 }}>
              <Entypo name="edit" size={24} color="black" />
              <Text>Edit</Text>
            </Pressable>

            <Pressable onPress={deleteHabit} style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 15 }}>
              <AntDesign name="delete" size={24} color="black" />
              <Text>Delete</Text>
            </Pressable>

          </View>
        </ModalContent>

      </BottomModal>
    </>
  );
}

export default Index;

const styles = StyleSheet.create({});
