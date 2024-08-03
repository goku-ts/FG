import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { FC } from "react"
import React from "react"
import { COLORS, SCREEN } from "../../constants/theme"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type buttonType = {
    color?: string
    onPress?: any
}

export const RemoveButton: FC<buttonType> = ({ onPress, color }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: COLORS.red1 }]}
            activeOpacity={0.8}
        >
            <MaterialCommunityIcons name="delete-forever" size={30} color={COLORS.red5} />
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.red5
    },
})