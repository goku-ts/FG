import React, { FC } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput } from "react-native";

import { COLORS, SCREEN } from "../../constants/theme";

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
        <>
            <Text style={{
                color: COLORS.gray5,
                marginLeft: 5
            }}>{label}</Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                maxLength={maxlength}
                keyboardType={"number-pad"}
                // placeholder={label}
                // placeholderTextColor={"gray"}
                style={{
                    width: SCREEN.width * 0.85,
                    height: 50,
                    marginBottom: 10,
                    fontSize: 18,
                    // borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 20,
                    backgroundColor: COLORS.gray1,
                    // borderColor: COLORS.primary5
                }}
            />
        </>
    )
}

export default MobileTextInput


const styles = StyleSheet.create({

});