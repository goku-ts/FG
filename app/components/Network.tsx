import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { COLORS } from '../constants'
import { SCREEN } from '../constants/theme'
import AntDesign from '@expo/vector-icons/AntDesign';


type NetworkProps = {
    visible: boolean
    cancel: any
    retry: any
}
export const Network: FC<NetworkProps> = ({
    visible,
    cancel,
    retry
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
                <View style={[styles.modalView, { backgroundColor: COLORS.green1, borderColor: COLORS.green9, }]}>
                    <View style={styles.modalTitle}>
                        <AntDesign name={"wifi"} size={35} color={COLORS.green9} />
                        <Text style={[styles.titleText, { color: COLORS.green9 }]}>No Connection</Text>
                    </View>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity onPress={() => cancel}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => retry}>
                            <Text>Retry</Text>
                        </TouchableOpacity>
                    </View>
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
        borderWidth: 5,

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