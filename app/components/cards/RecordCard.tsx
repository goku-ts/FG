import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Card, } from 'react-native-paper';
import { COLORS, SCREEN } from '../../constants/theme';


import { MediumText } from '../texts/MediunText';
import { LargeText } from '../texts/LargeText';
import { SmallText } from '../texts/SmallText';
import { images } from '../../constants';
type RecordCard = {
    name?: string,
    gender?: string,
    onPress?: any
    region?: string
    profile?: string | ""
}

const RecordCard: React.FC<RecordCard> = ({ name, gender, onPress, region, profile }) => (
    <TouchableOpacity style={[styles.container]} activeOpacity={0.9} onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15, }}>
            <Avatar.Image size={60} source={profile === "" ? images.profile_img : { uri: profile }} />
            <View style={styles.textContainer}>
                <MediumText text={name} marginTop={-5} />
                <View style={{ flexDirection: "row", }}>
                    <SmallText text={gender} marginRight={15} />
                    <SmallText text={region} />
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default RecordCard;


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        width: SCREEN.width * 0.88,
        height: SCREEN.height * 0.08,
        borderRadius: 10,
        elevation: 0.5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 3,
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: COLORS.lightGray
    },
    price: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    textContainer: {
        padding: 20,
        marginLeft: 10,
    },
    profile: {
        height: 80,
        width: 80,
        borderRadius: 50,
        marginLeft: 10

    }
});
