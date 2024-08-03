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
    community?: string
    profile?: string | ""
}

const RecordCard: React.FC<RecordCard> = ({ name, gender, onPress, region, profile, community }) => (
    <TouchableOpacity style={[styles.container]} activeOpacity={0.9} onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15, }}>
            {profile === "" ?
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.gray3,
                    height: 65,
                    width: 65,
                    borderRadius: 35,
                }}>
                    <LargeText text={name.substring(0, 1)} color={COLORS.white} />
                </View> : <Avatar.Image size={80} source={images.profile_img} />}
            <View style={styles.textContainer}>
                <MediumText text={name.substring(0, 20)} marginTop={0} color={COLORS.gray7} />
                <View style={{ flexDirection: "row", }}>
                    <SmallText text={gender} marginRight={20} color={COLORS.gray6} />
                    <SmallText text={community} color={COLORS.gray6} />
                </View>
                <SmallText text={region} color={COLORS.gray6} />
            </View>
        </View>
    </TouchableOpacity>
);

export default RecordCard;


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray1,
        width: SCREEN.width * 0.88,
        height: SCREEN.height * 0.09,
        borderRadius: 5,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 4,
        justifyContent: "center",
    },
    textContainer: {
        padding: 30,
        marginLeft: 10,
    },
    profile: {
        height: 80,
        width: 80,
        borderRadius: 50,
        marginLeft: 10

    }
});
