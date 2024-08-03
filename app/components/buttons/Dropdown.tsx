import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

import { FC, useRef } from "react"
import React from "react"
import { COLORS, SCREEN } from "../../constants/theme"
import { Ionicons } from "@expo/vector-icons"

type buttonType = {
    name: any
    color?: string
    onPress?: any
    iconName?: any,
    backgroundColor?: string,
    label?: string
}


export const Dropdown: FC<buttonType> = ({ name, onPress, iconName, color, backgroundColor, label }) => {

    return (
        <>
            <Text style={{
                color: COLORS.gray5,
                marginLeft: 5
            }}>{label}</Text>

            <TouchableOpacity
                onPress={onPress}
                style={[styles.button, { backgroundColor: COLORS.gray1 }]}
                activeOpacity={0.7}
            >
                <View style={styles.buttonView}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "normal", marginLeft: 20, color: COLORS.gray9 }}>{name}</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <Ionicons name={iconName} size={30} color={"grey"} />
                    </View>
                </View>

            </TouchableOpacity>

        </>
    )
}



const styles = StyleSheet.create({
    button: {
        width: SCREEN.width * 0.85,
        height: 50,
        borderRadius: 5,
        // borderWidth: 1,
        justifyContent: "center",
        marginTop: 1,
        marginBottom: 10,
        backgroundColor: COLORS.gray1,
        // borderColor: COLORS.primary5
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})