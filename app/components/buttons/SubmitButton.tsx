import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native"
import { FC } from "react"
import React from "react"
import { SCREEN } from "../../constants/theme"

type buttonType = {
  name: any
  color?: string
  onPress?: any
  isLoading?: boolean
}

export const SubmitButton: FC<buttonType> = ({ name, onPress, color, isLoading = false }) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
      activeOpacity={0.8}
    >
      {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{name}</Text>}
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  button: {
    width: SCREEN.width * 0.85,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40
  },
})