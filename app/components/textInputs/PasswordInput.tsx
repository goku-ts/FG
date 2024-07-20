import React, { FC, useState } from "react";
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
    activeColor?: string
    outlineColor? : string
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
            mode="outlined"
            label={label}
            activeOutlineColor={"green"}
            secureTextEntry={isPasswordVisible}
            outlineColor={outlineColor}
            right={<TextInput.Icon icon={ isPasswordVisible ? "eye": "eye-off"} onPress={togglePasswordVisibility}/>}
            style={{
                width: SCREEN.width * 0.85,
                height: 50,
                marginBottom : 10,
                fontSize : 18
            }}
        />
    )
}

export default PasswordTextInput

const styles = StyleSheet.create({

});