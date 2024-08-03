import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREEN } from '../../constants/theme'

export const DetailsCardLong = ({ label, details }) => {
    return (
        // container
        <View style={styles.containerLong}>
            {/* top-left-label */}
            <View style={{ flexDirection: "row" }}>
                <View style={styles.labelLong}>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </View>
            {/* value */}
            <View style={styles.valueLong}>
                <Text style={styles.details}>{details}</Text>
            </View>
        </View>
    )
}


export const DetailsCardShort = ({ label, details }) => {
    return (
        // container
        <View style={styles.containerShort}>
            {/* top-left-label */}
            <View style={{ flexDirection: "row" }}>
                <View style={styles.labelLong}>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </View>
            {/* value */}
            <View style={styles.valueLong}>
                <Text style={styles.details}>{details}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerLong: {
        width: SCREEN.width * 0.8,
        backgroundColor: "#FCFBF4",
        height: SCREEN.height * 0.07,
        padding: 5,
        borderRadius: 10,
        elevation: 0.5,
        marginBottom: 5
    },
    labelLong: {
        backgroundColor: COLORS.orange1,
        padding: 5,
        borderRadius: 5,
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderColor: COLORS.orange5
    },
    valueLong: {
        alignItems: "flex-end",
        marginRight: 20
    },
    containerShort: {
        width: SCREEN.width * 0.44,
        backgroundColor: "#FCFBF4",
        height: SCREEN.height * 0.07,
        padding: 5,
        borderRadius: 10,
        elevation: 0.5,
        marginBottom: 5
    },
    label: {
        fontSize: 12,
        // fontWeight: "bold",
        color: COLORS.orange5
    },
    details: {
        color: COLORS.green9,
        fontSize: 17,
        marginTop: -10,
        // fontWeight: "bold"
    },
})