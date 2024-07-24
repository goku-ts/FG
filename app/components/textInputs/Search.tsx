import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput } from "react-native";
import { SCREEN } from "../../constants/theme";

type FormInputType = {
    label?: string
    value?: any
    onChangeText?: any
    onBlur?: any
    keyboardType?: KeyboardTypeOptions
    maxlength?: number,
    activeColor?: string,
    outlineColor?: string

}

const Search: FC<FormInputType> = ({ outlineColor, label, value, onChangeText, onBlur, keyboardType, maxlength, activeColor }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            placeholder={label}
            style={{
                width: SCREEN.width * 0.65,
                height: 40,
                fontSize: 18,
                borderWidth: 0.5,
                borderRadius: 5,
                paddingLeft: 20,
            }}
        />
    )
}

export default Search

const styles = StyleSheet.create({

});