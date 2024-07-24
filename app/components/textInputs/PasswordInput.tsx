import React, { FC, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput } from "react-native";
import { SCREEN } from "../../constants/theme";

type FormInputType = {
    label?: string
    value?: any
    onChangeText?: any
    onBlur?: any
    keyboardType?: KeyboardTypeOptions
    maxlength?: number,
    activeColor?: string
    outlineColor?: string
}

const PasswordTextInput: FC<FormInputType> = ({ outlineColor, label, value, onChangeText, onBlur, keyboardType, maxlength, activeColor }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };


    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            maxLength={maxlength}
            keyboardType={keyboardType}
            placeholder={label}
            secureTextEntry={isPasswordVisible}
            style={{

                width: SCREEN.width * 0.85,
                height: 50,
                marginBottom: 10,
                fontSize: 18,
                borderWidth: 0.5,
                borderRadius: 5,
                paddingLeft: 20,
            }}
        />
    )
}

export default PasswordTextInput

const styles = StyleSheet.create({

});