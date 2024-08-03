import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { FC } from "react"
import React from "react"
import { COLORS, SCREEN } from "../../constants/theme"
import FontAwesome from '@expo/vector-icons/FontAwesome';



type buttonType = {
    onPress?: any
}

export const EditButton: FC<buttonType> = ({ onPress, }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: COLORS.gray1 }]}
            activeOpacity={0.8}
        >
            <FontAwesome name="edit" size={24} color={COLORS.gray7} />
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
        borderColor: COLORS.gray5
    },
})