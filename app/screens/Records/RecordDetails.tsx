import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import { COLORS } from '../../constants';

import { dataType } from '../../data';

import { Wrapper } from '../../components/Wrapper';
import { SCREEN } from '../../constants/theme';
import { ScreenWrapper } from '../../components/ScreenWrapper';

import { SubmitButton } from '../../components/buttons/SubmitButton';
import { OutlineButton } from '../../components/buttons/OutlineButton copy';
import images, { placeholder } from '../../constants/images';

import { Data } from '../../data';
import { LabelCard } from '../../components/cards/LabelCard';
import AudioPlayer from '../../components/AudioPlayer';
import { EditButton } from '../../components/buttons/EditButton';
import { RemoveButton } from '../../components/buttons/RemoveButton';
import { GenerateCodeButton } from '../../components/buttons/GenerateCodeButton';
import QRCode from 'react-native-qrcode-svg';
import { DownloadCodeButton } from '../../components/buttons/DownloadCodeButton';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

import { shareAsync } from 'expo-sharing';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { ToastAndroid } from "react-native"
import RNFS from "react-native-fs"
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { deleteRecord, getAllRecords } from '../../dbServices/recordController';
import { deleteFileFromDB } from '../../dbServices/mediaUpload';
import { Confirmations } from '../../components/Confirmations';
import { LargeText } from '../../components/texts/LargeText';
import { MediumText } from '../../components/texts/MediunText';

const RecordDetails = ({ navigation, route }) => {
  const [data, setData] = React.useState<any>()


  React.useEffect(() => {
    let getData = route?.params?.item
    setData(getData)
  }, [])

  const [qrValue, setQRValue] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [qrImage, setQRImage] = useState('');
  const [qrName, setQRName] = useState("user");
  const [isDeleting, setIsDeleting] = useState(false)



  const ref = React.useRef<any>();

  const generateQRCode = () => {
    setQRName(data?.full_name)
    setIsActive(true);
  };






  function downloadQR(name) {
    ref.current.toDataURL(async (data: string) => {

      try {
        let fileUri = FileSystem.documentDirectory + `${name}.png`;
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });

        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);

        console.log('QR code saved successfully');
      } catch (error) {
        console.log('Error saving QR code:', error);
      }
    });

  }


  const DeleteRecord = () => {
    Alert.alert('Are you sure', 'Do you really want to delete this record?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES', onPress: async () => {
          setIsDeleting(true)
          try {
            await deleteRecord(data?.id)
            if (data?.image !== "") {
              await deleteFileFromDB(data?.full_name)
            }
          } catch (error) {
            console.log(error)
          } finally {
            setIsDeleting(false)
            navigation.navigate("records")
          }
        }
      },
    ])
  }



  const ProfilePicture = ({ onPress, image }) => {
    return (
      <>
        <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={onPress}>

          {
            image ? <Image source={{ uri: data?.image }} style={{ height: 150, width: 150, borderRadius: 75 }} />
              : <View style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.gray3,
                height: 200,
                width: 200,
                borderRadius: 100,
              }}>
                <LargeText text={data?.full_name.substring(0, 1)} color={COLORS.white} />
              </View>
          }
        </TouchableOpacity>
      </>
    )
  }

  const InfoCard = () => {
    return (
      <View style={{
        width: SCREEN.width * 0.9,
        height: SCREEN.height * 1.2,
        // borderWidth: 0.1,
        // borderRadius: 1,
        // elevation: 0.5,
        alignItems: "center",
      }}>
        <View style={{ marginBottom: 20 }} />
        <LabelCard label={"Unique ID"} details={data?.unique_id} />
        <LabelCard label={"Gender"} details={data?.gender === "" ? "N/A" : data?.gender} />
        <LabelCard label={"DOB"} details={data?.dob === "" ? "N/A" : data?.dob} />
        <LabelCard label={"Contact"} details={data?.contact === "" ? "N/A" : data?.contact} />
        <LabelCard label={"Household No."} details={data?.household_number === "" ? "N/A" : data?.household_number} />
        <LabelCard label={"Region"} details={data?.region === "" ? "N/A" : data?.region} />
        <LabelCard label={"District"} details={data?.district === "" ? "N/A" : data?.district} />
        <LabelCard label={"Community"} details={data?.community === "" ? "N/A" : data?.community} />
        <LabelCard label={"Ghana Card ID"} details={data?.card_id === "" ? "N/A" : data?.card_id} />
        <LabelCard label={"Pre-Finance"} details={data?.pre_finance === "" ? "N/A" : data?.pre_finance} />
        <LabelCard label={"Amount Issued"} details={data?.pre_finance_amount === "" ? "N/A" : data?.pre_finance_amount} />
        <LabelCard label={"Date Issued"} details={data?.pre_finance_date === "" ? "N/A" : data?.pre_finance_date} />
        <LabelCard label={"Farm-Input"} details={data?.farm_input === "" ? "N/A" : data?.farm_input} />
        <LabelCard label={"Input Issued"} details={data?.farm_input_items === "" ? "N/A" : data?.farm_input_items} />
        <LabelCard label={"Date Issued"} details={data?.farm_input_date === "" ? "N/A" : data?.farm_input_date} />
        <AudioPlayer />
        <View style={{ marginBottom: 50 }} />
        {isActive && (
          <View style={styles.qrCode}>
            <QRCode
              value={data?.id}
              size={200}
              color="black"
              backgroundColor="white"
              getRef={(c) => ref.current = c}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>{data?.full_name}</Text>
          </View>
        )}
        {isActive ? <DownloadCodeButton name={"Download QR Code"} onPress={() => downloadQR(qrName)} icon={"download"} /> :
          <GenerateCodeButton name={"Generate QR Code"} color={COLORS.primary6} onPress={() => generateQRCode()} icon={"qr-code-outline"} />}
      </View>
    )
  }


  return (
    <>

      <ScreenWrapper>
        {isDeleting && <Confirmations message='Deleting Record' visible={true} color={COLORS.red2} textColor={COLORS.red6} icon={"delete"} />}
        {/* </View> */}
        <View style={styles.container}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 20,
            width: SCREEN.width * 0.9,
            backgroundColor: COLORS.background
          }}>
            <EditButton onPress={() => navigation.navigate("edit_records", { data })} />
            <RemoveButton onPress={() => DeleteRecord()} />
          </View>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <ProfilePicture image={data?.image} onPress={() => { }} />

            <MediumText text={data?.full_name} marginTop={20} color={COLORS.green9} />
            <InfoCard />
            <View style={{ marginBottom: 150 }} />
          </View>
        </View>

      </ScreenWrapper >
    </>
  );
}

export default RecordDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,

  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius: 75
  },
  qrCode: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 20,
    borderRadius: 15
  },
});
