import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { FC } from "react"
import React from "react"
import { SCREEN } from "../../constants/theme"
import IonIcons from '@expo/vector-icons/Ionicons';

type buttonType = {
    name: any
    color?: string
    onPress?: any
}

export const GenerateCodeButton: FC<buttonType> = ({ name, onPress, color }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: color }]}
            activeOpacity={0.8}
        >
            <IonIcons name="qr-code-outline" size={30} color="white" style={{ marginRight: 30 }} />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{name}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        width: SCREEN.width * 0.85,
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 40
    },
})