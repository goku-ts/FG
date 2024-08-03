import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { COLORS, SCREEN } from '../../constants/theme'
import Entypo from '@expo/vector-icons/Entypo';


export const LabelCard: FC<{ label: any, details: any }> = ({ details, label }) => {
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
            <View style={styles.labelBackground}>
                <Text style={styles.label}>{label} </Text>
            </View>
            <Text style={styles.details}>{details}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        // fontWeight: "bold",
        color: COLORS.orange5
    },
    details: {
        color: COLORS.green9,
        fontSize: 16,
        marginRight: 10,
        // fontWeight: "bold"
    },
    labelBackground: {
        backgroundColor: COLORS.orange1,
        padding: 5,
        borderRadius: 5
    }
})