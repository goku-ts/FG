import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput } from "react-native";
import { COLORS, SCREEN } from "../../constants/theme";

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
                backgroundColor: COLORS.gray1,
                width: SCREEN.width * 0.7,
                height: 40,
                fontSize: 18,
                // borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 20,
                // borderColor: COLORS.primary5
            }}
        />
    )
}

export default Search

const styles = StyleSheet.create({

});