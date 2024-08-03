import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { COLORS } from '../constants'
import { SCREEN } from '../constants/theme'
import AntDesign from '@expo/vector-icons/AntDesign';


type ConfirmationProps = {
    visible: boolean
    message: string
    color?: string
    textColor?: string
    icon?: any
}
export const Confirmations: FC<ConfirmationProps> = ({
    visible,
    message,
    color = COLORS.green1,
    textColor = COLORS.green9,
    icon
}) => {
    // const animation = useRef<LottieView>(null);

    return (
        <Modal
            transparent
            statusBarTranslucent
            visible={visible}
            animationType='slide'
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalView, { backgroundColor: "#FCFBF4", borderColor: textColor, }]}>
                    <View style={styles.modalTitle}>
                        <AntDesign name={icon} size={35} color={textColor} />
                        <Text style={[styles.titleText, { color: textColor }]}>{message}</Text>
                    </View>
                    <ActivityIndicator size={40} color={textColor} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    modalView: {

        height: SCREEN.height * 0.25,
        width: SCREEN.width * 0.7,
        borderRadius: 15,
        justifyContent: "center",
        borderWidth: 1,

        alignItems: "center"

    },
    modalTitle: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 30
    },
    titleText: {
        color: COLORS.green9,
        // fontWeight: "bold",
        fontSize: 20,
        marginLeft: 15
    }
})