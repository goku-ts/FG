
import React from "react"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native"
import { COLORS } from "../constants"

export const Wrapper = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
            <KeyboardAvoidingView keyboardVerticalOffset={0} style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    {children}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    }
})