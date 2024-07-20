import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput } from "react-native";

import { SCREEN } from "../../constants/theme";

type FormInputType = {
    label?: string
    value?: any
    onChangeText?: any
    onBlur?: any
    maxlength?: number,
    activeColor?: string,
    outlineColor?: string

}

const MobileTextInput: FC<FormInputType> = ({ outlineColor, label, value, onChangeText, onBlur, maxlength, activeColor }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            maxLength={maxlength}
            keyboardType={"number-pad"}
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

export default MobileTextInput


const styles = StyleSheet.create({

});