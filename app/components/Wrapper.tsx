
import React from "react"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native"
import { COLORS } from "../constants"

export const Wrapper = ({ children }) => {
    return (
        <SafeAreaView >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView keyboardVerticalOffset={0} style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>

                    {children}

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: "center",

    }
})