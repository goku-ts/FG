import { Text, StyleSheet, Platform } from "react-native"
import { COLORS } from "../../constants"
import { FC } from "react"
import React from "react"

type largeTextType = {
    text: string
    color?: string
    marginTop?: number,
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
}

export const LargeText: FC<largeTextType> = ({
    color = COLORS.black,
    text,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop
}) => {
    return (
        <Text style={
            [styles.largetext,
            {
                marginBottom,
                marginLeft,
                marginRight,
                marginTop,
                color: color
            }]}>{text}</Text>
    )
}



const styles = StyleSheet.create({
    largetext: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        flexWrap: "wrap"
    }
})