import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
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
            maxLength={maxlength}
            mode="outlined"
            label={label}
            activeOutlineColor={activeColor}
            outlineColor={outlineColor}
            style={{
                width: SCREEN.width * 0.65,
                height: 40,
                fontSize: 18,
            }}
        />
    )
}

export default Search

const styles = StyleSheet.create({

});