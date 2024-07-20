import {TouchableOpacity,StyleSheet,Text} from "react-native"
import { FC } from "react"
import React from "react"
import { COLORS, SCREEN } from "../../constants/theme"

type buttonType = {
    name : any
    color? : string
    onPress? : any
}

export const OutlineButton : FC<buttonType> = ({ name, onPress, color }) =>{
    return(
        <TouchableOpacity
        onPress={onPress}
        style={[styles.button,{backgroundColor:color}]}
        activeOpacity={0.8}
      >
        <Text style={{fontSize:18,fontWeight:"bold",color:COLORS.primary}}>{name}</Text>
      </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        width: SCREEN.width * 0.85,
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom :5,
        borderWidth : 2,
        borderColor : COLORS.primary
      },
})