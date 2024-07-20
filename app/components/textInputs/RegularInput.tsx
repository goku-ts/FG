import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput } from "react-native";

import { SCREEN } from "../../constants/theme";

type FormInputType = {
    label?: string
    value?: any
    onChangeText?: any
    onBlur?: any
    activeColor?: string,
    outlineColor?: string

}

const RegularInput: FC<FormInputType> = ({ outlineColor, label, value, onChangeText, onBlur, activeColor }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            placeholder={label}
            placeholderTextColor={"gray"}
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

export default RegularInput

const styles = StyleSheet.create({

});