
import React from "react"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native"
import { COLORS } from "../constants"

export const ScreenWrapper = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <KeyboardAvoidingView keyboardVerticalOffset={0} style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                        {children}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    }
})