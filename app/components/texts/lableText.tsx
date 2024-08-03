import React from "react"
import { Text } from "react-native"
import { COLORS } from "../../constants"

export const LableText = ({ name }) => {
    return (
        <Text style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Poppins-SemiBold" }}>{name}</Text>
    )
}