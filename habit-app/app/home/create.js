import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useRouter } from "expo-router";

const Create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  
  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];
  
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const router = useRouter();

  async function addHabit() {
    try {
      const habitDetails = { 
        title: title, 
        color: selectedColor, 
        repeatMode: "daily", 
        reminder: true 
      };

      const response = await axios.post("http://192.168.1.246:3000/habits", habitDetails);
      
      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit added successfully", "Enjoy Practicing");
      }

      console.log("Habit Added", response);
    } catch (error) {
      console.log("Error adding a habit", error);
      Alert.alert("Failed to add habit", "Please try again later.");
    }
  }
  
  return (
    
    <View style={{ padding: 10 }}>
      {/*Back Icon*/}
      <Ionicons onPress={() => router.push("/home")} name="arrow-back" size={24} color="black" />

      {/*Habit Text*/}
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}> Habit </Text>
      </Text>

      {/*Habit Name Input*/}
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{ width: "95%", marginTop: 15, padding: 15, borderRadius: 10, backgroundColor: "#E1EBEE" }}
        placeholder="Title"
      />

      {/*Colors for Habit*/}
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}> Color </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
          {colors.map((item, index) => (
            <TouchableOpacity onPress={() => setSelectedColor(item)} key={index} activeOpacity={0.8}>
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/*Label for Habit Frequency*/}
      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
        <Pressable style={{ backgroundColor: "#AFDBF5", padding: 10, borderRadius: 6, flex: 1 }}>
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: "#AFDBF5", padding: 10, borderRadius: 6, flex: 1 }}>
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>

      {/*Days of the Week for Specific Habit*/}
      <Text style={{ fontSize: 18, fontWeight: "500" }}>On These Days</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
        {days.map((item, index) => (
          <Pressable key={index} style={{ width: 40, height: 40, borderRadius: 5, backgroundColor: "#D0D0D0", justifyContent: "center", alignItems: "center" }}>
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      {/*Reminders with Yes option*/}
      <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "#2774AE" }}>Yes</Text>
      </View>

      {/*Save Button*/}
      <Pressable onPress={addHabit} style={{ marginTop: 25, backgroundColor: "#00428C", padding: 10, borderRadius: 8 }}>
        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>SAVE</Text>
      </Pressable>
    </View>
  );
}

export default Create;

const styles = StyleSheet.create({});
