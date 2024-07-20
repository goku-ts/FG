import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Card, } from 'react-native-paper';
import { COLORS, SCREEN } from '../../constants/theme';


import { MediumText } from '../texts/MediunText';
import { LargeText } from '../texts/LargeText';
import { SmallText } from '../texts/SmallText';
import { images } from '../../constants';
type ListingCard = {
    name?: string,
    price?: string,
    location?: string,
    category?: string,
    variety?: string,
    image?: string,
    onPress?: any
}

const ListingCard: React.FC<ListingCard> = ({ name, price, location, category, variety, image, onPress }) => (
    <TouchableOpacity style={[styles.container]} activeOpacity={0.9} onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
            <Avatar.Image size={60} source={images.av} />
            <View style={styles.textContainer}>
                <MediumText text='Jane Doe' marginTop={-5} />
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <SmallText text='F' marginRight={15} />
                    <SmallText text='Upper West' />
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default ListingCard;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F4",
        width: SCREEN.width * 0.9,
        height: SCREEN.height * 0.08,
        borderRadius: 10,
        elevation: 0.5,
        margin: 5,
        justifyContent: "center",
    },
    price: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    textContainer: {
        margin: 20
    },
    profile: {
        height: 80,
        width: 80,
        borderRadius: 50,
        marginLeft: 10

    }
});
