import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React from 'react';

// import icons
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';


const index = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>

      {/* foursquare logo icon*/} 
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Ionicons name="logo-foursquare" size={27} color="black" />
        <AntDesign name="plus" size={24} color="black" />
      </View>

      {/*Habits text */}
      <Text style={{ marginTop: 5, fontSize: 23, fontWeight: "500" }}> Habits </Text>

      {/*flex direction organization of the pressables: today, weekly, and overall */}
      <View style={{flexDirection:"row", alignItems:"center", gap:10, marginVertical:8}}>
        <Pressable style={{
          backgroundColor: "#E0E0E0",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 25,
        }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>Today</Text>
        </Pressable>

        <Pressable style={{
          backgroundColor: "#E0E0E0",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 25,
        }}>
          <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>Weekly</Text>
        </Pressable>

        <Pressable style={{
          backgroundColor: "#E0E0E0",
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