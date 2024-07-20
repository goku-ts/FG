import { Audio } from 'expo-av';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SCREEN } from '../constants/theme';
import { MediumText } from './texts/MediunText';

import IonIcons from '@expo/vector-icons/Ionicons';

export default function AudioPlayer() {
    const [recording, setRecording] = React.useState<any>();
    const [recordings, setRecordings] = React.useState([]);

    async function startRecording() {
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                setRecording(recording);
            }
        } catch (err) { }
    }

    async function stopRecording() {
        setRecording(undefined);

        await recording.stopAndUnloadAsync();
        let allRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        allRecordings.push({
            sound: sound,
            file: recording.getURI()
        });

        setRecordings(allRecordings);
    }


    function clearRecordings() {
        setRecordings([])
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: SCREEN.height * 0.04,

            }}>
                <View>
                    <Text style={styles.label}>Verbal Consent</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={recording ? stopRecording : startRecording}>
                        {recording ? <IonIcons name="stop" size={25} color="red" /> : <IonIcons name="play" size={30} color="green" />}
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN.width * 0.8,
        height: SCREEN.height * 0.04,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    buttons: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 30
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "grey"
    },
});