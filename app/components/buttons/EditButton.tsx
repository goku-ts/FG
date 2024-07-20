import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { FC } from "react"
import React from "react"
import { COLORS, SCREEN } from "../../constants/theme"

type buttonType = {
    name: any
    color?: string
    onPress?: any
}

export const EditButton: FC<buttonType> = ({ name, onPress, color }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: color }]}
            activeOpacity={0.8}
        >
            <Text style={{ fontSize: 15, color: COLORS.primary }}>{name}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary
    },
})