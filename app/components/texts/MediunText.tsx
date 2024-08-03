import { Text, StyleSheet, Platform } from "react-native"
import { COLORS, SIZES } from "../../constants"
import { FC } from "react"
import React from "react"

type mediumTextType = {
    text: string
    color?: string
    marginTop?: number,
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
}

export const MediumText: FC<mediumTextType> = ({ color = COLORS.black, text, marginBottom, marginLeft, marginRight, marginTop }) => {
    return (
        <Text style={[styles.mediumtext, { color: color, marginBottom, marginLeft, marginRight, marginTop }]}>{text}</Text>
    )
}



const styles = StyleSheet.create({
    mediumtext: {
        fontSize: 17,
        // fontWeight: "700",
        marginTop: Platform.OS === "ios" ? 0 : 0,
        flexWrap: "wrap",
        fontFamily: "Inter-Regular"
    }
})