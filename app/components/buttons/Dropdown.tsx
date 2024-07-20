import { TouchableOpacity, StyleSheet, Text, View } from "react-native"

import { FC, useRef } from "react"
import React from "react"
import { SCREEN } from "../../constants/theme"
import { Ionicons } from "@expo/vector-icons"

type buttonType = {
    name: any
    color?: string
    onPress?: any
    iconName?: any,
    backgroundColor?: string
}


export const Dropdown: FC<buttonType> = ({ name, onPress, iconName, color, backgroundColor }) => {

    return (
        <>
            <View style={{}}>

                <TouchableOpacity
                    onPress={onPress}
                    style={[styles.button, { backgroundColor: backgroundColor }]}
                    activeOpacity={0.7}
                >
                    <View style={styles.buttonView}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "normal", marginLeft: 20, }}>{name}</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name={iconName} size={30} color={"grey"} />
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    button: {
        width: SCREEN.width * 0.85,
        height: 50,
        borderRadius: 5,
        borderWidth: 0.5,
        justifyContent: "center",
        marginTop: 1,
        marginBottom: 10
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})