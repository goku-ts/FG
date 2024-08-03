import { Text, StyleSheet, Platform } from "react-native"
import { COLORS, SIZES } from "../../constants"
import { FC } from "react"
import React from "react"

type smallTextType = {
    text: string
    color?: string
    weight?: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    marginTop?: number,
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
}

export const SmallText: FC<smallTextType> = ({
    marginBottom, marginLeft, marginRight, marginTop, color = COLORS.black, text, weight = "normal" }) => {
    return (
        <Text style={[styles.smalltext, {
            color: color,
            fontWeight: weight,
            marginBottom,
            marginLeft,
            marginRight,
            marginTop
        }]}>{text}</Text>
    )
}


const styles = StyleSheet.create({
    smalltext: {
        fontSize: 15,
        fontFamily: "Poppins-Regular"
    }
})