import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const create = () => {
  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ]
  return (
    <View style={{ padding: 10 }}>
      {/*Back Icon*/}
      <Ionicons name="arrow-back" size={24} color="black" />
      {/*Habit Text*/}
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit </Text>
      </Text>

      {/*Habit Name Input*/}
      <TextInput
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#E1EBEE"
        }}
        placeholder="Title" />

      {/*Colors for Habit*/}
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
          {colors?.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8}>
              <FontAwesome name="square" size={30} color={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <Text style={{fontSize:18,fontWeight:"500"}}>Repeat</Text>
      
    </View>
  )
}

export default create

const styles = StyleSheet.create({})