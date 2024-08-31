import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import {useRouter} from "expo-router";

// import icons
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';


const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>

      {/* foursquare logo and plus icon on top as flex direction*/}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {/*foursquare logo*/}
        <Ionicons name="logo-foursquare" size={27} color="black" />

        {/*plus button logo*/}
        <AntDesign onPress={() => router.push("/home/create")} name="plus" size={24} color="black" />

      </View>

      {/*Habits text */}
      <Text style={{ marginTop: 5, fontSize: 23, fontWeight: "500" }}> Habits </Text>

      {/*flex direction organization of the pressables: today, weekly, and overall */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 8 }}>


        {/* Today Pressable */}
        <Pressable
          onPress={() => setOption("Today")}
          style={{
            backgroundColor: option == "Today" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>Today</Text>
        </Pressable>


        {/* Weekly Pressable */}
        <Pressable
          onPress={() => setOption("Weekly")}
          style={{
            backgroundColor: option == "Weekly" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>Weekly</Text>
        </Pressable>


        {/*Overall Pressable*/}
        <Pressable
          onPress={() => setOption("Overall")}
          style={{
            backgroundColor: option == "Overall" ? "#E0FFFF" : "transparent",
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 25,
          }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>Overall</Text>
        </Pressable>
      </View>


    </ScrollView>
  )
}

export default index;

const styles = StyleSheet.create({})