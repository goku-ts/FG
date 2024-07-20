import { Audio } from 'expo-av';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SCREEN } from '../constants/theme';
import { MediumText } from './texts/MediunText';

import IonIcons from '@expo/vector-icons/Ionicons';

export default function AudioRecord() {
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
                justifyContent: 'space-around',
                marginRight: 40,
                width: "100%",
                height: SCREEN.height * 0.06,
                borderWidth: 0.5,
                borderRadius: 10,
            }}>
                <View>
                    <MediumText text='Recordings' />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={recording ? stopRecording : startRecording}>
                        {recording ? <IonIcons name="stop" size={25} color="red" /> : <IonIcons name="mic" size={30} color="black" />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => recordings.length > 0 && recordings[0].sound.replayAsync()}>

                        <IonIcons name="play" size={25} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={clearRecordings}>
                        <IonIcons name="trash" size={25} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN.width * 0.85,
        height: SCREEN.height * 0.06,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    buttons: {
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});