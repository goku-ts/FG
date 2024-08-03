import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { FC } from "react"
import React from "react"
import { COLORS, SCREEN } from "../../constants/theme"
import IonIcons from '@expo/vector-icons/Ionicons';

type buttonType = {
    name: any
    color?: string
    onPress?: any
    icon?: any
}

export const DownloadCodeButton: FC<buttonType> = ({ name, onPress, color, icon }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button]}
            activeOpacity={0.8}

        >
            <IonIcons name={icon} size={30} color="white" style={{ marginRight: 30 }} />
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{name}</Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        width: SCREEN.width * 0.8,
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 50,
        backgroundColor: COLORS.green6
    },
})