import React, { useRef, useState } from "react"
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native"
import { COLORS, images } from "../constants"








const ProfilePicture = ({ onPress, image }) => {
    return (
        <>
            <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={onPress}>

                {
                    image === "" ? <Image source={images.profile_img} style={{ height: 120, width: 120, borderRadius: 60 }} />
                        : <Image source={{ uri: image }} style={{ height: 120, width: 120, borderRadius: 60 }} />
                }
                {image === "" ? <Text>Upload Image</Text> : null}
            </TouchableOpacity>
        </>
    )
}

export default ProfilePicture

const styles = StyleSheet.create({
    profile: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        height: 120,
        width: 120,
        borderRadius: 60
    }
})