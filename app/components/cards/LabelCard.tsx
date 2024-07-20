import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SCREEN } from '../../constants/theme'

export default function LabelCard({ details, label }) {
    return (
        <View style={{
            flexDirection: "row",
            width: SCREEN.width * 0.8,
            height: 35,
            padding: 2,
            marginTop: 0,
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Text style={styles.label}>{label} </Text>
            <Text style={styles.details}>{details}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "grey"
    },
    details: {
        color: "black",
        fontSize: 15,
        marginRight: 10
    }
})