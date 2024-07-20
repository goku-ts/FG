import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { COLORS } from '../../constants';

import { dataType } from '../../data';

import { Wrapper } from '../../components/Wrapper';
import { SCREEN } from '../../constants/theme';
import { ScreenWrapper } from '../../components/ScreenWrapper';

import { SubmitButton } from '../../components/buttons/SubmitButton';
import { OutlineButton } from '../../components/buttons/OutlineButton copy';
import images, { placeholder } from '../../constants/images';

import { Data } from '../../data';
import LabelCard from '../../components/cards/LabelCard';
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



const RecordDetails = ({ navigation, route }) => {


  const [data, setData] = React.useState<any>()
  React.useEffect(() => {
    // let getData = route?.params?.item
    setData(Data[0])
  }, [])

  const [qrValue, setQRValue] = useState('x.com');
  const [isActive, setIsActive] = useState(false);
  const [qrImage, setQRImage] = useState('');
  const [qrRef, setQRRef] = useState();



  const ref = React.useRef<any>();

  const generateQRCode = () => {

    // ref.current.toDataURL((data: string) => {
    //   setQRImage( + data)
    // })

    if (!qrValue) return;
    setIsActive(true);
  };






  function downloadQR() {
    ref.current.toDataURL(async (data: string) => {

      try {
        let fileUri = FileSystem.documentDirectory + 'qrcode.png';
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });

        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);

        console.log('QR code saved successfully');
      } catch (error) {
        console.log('Error saving QR code:', error);
      }
    });

  }




  const ProfilePicture = ({ onPress, image }) => {
    return (
      <>
        <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={onPress}>

          {
            image ? <Image source={{ uri: data?.image }} style={{ height: 150, width: 150, borderRadius: 75 }} />
              : <Image source={images.profile_img} style={{ height: 150, width: 150, borderRadius: 75 }} />
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
        <LabelCard label={"Full Name"} details={data?.full_name} />
        <LabelCard label={"Gender"} details={data?.gender} />
        <LabelCard label={"DOB"} details={data?.dob} />
        <LabelCard label={"Contact"} details={`0${data?.contact}`} />
        <LabelCard label={"Household No."} details={data?.household_number} />
        <LabelCard label={"Region"} details={data?.region} />
        <LabelCard label={"District"} details={data?.district} />
        <LabelCard label={"Community"} details={data?.community} />
        <LabelCard label={"Ghana Card ID"} details={data?.card_id} />
        <LabelCard label={"Pre-Finance"} details={data?.pre_finance} />
        <LabelCard label={"Amount Issued"} details={data?.pre_finance_amount} />
        <LabelCard label={"Date Issued"} details={data?.pre_finance_date} />
        <LabelCard label={"Farm-Input"} details={data?.farm_input} />
        <LabelCard label={"Input Issued"} details={data?.farm_input_items} />
        <LabelCard label={"Date Issued"} details={data?.farm_input_date} />
        <AudioPlayer />
        <View style={{ marginBottom: 50 }} />
        {isActive && (
          <View style={styles.qrCode}>
            <QRCode
              value={qrValue}
              size={200}
              color="black"
              backgroundColor="white"

              getRef={(c) => ref.current = c}
            />
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>{data?.full_name}</Text>
          </View>
        )}
        {isActive && <DownloadCodeButton name={"Download QR Code"} onPress={() => downloadQR()} icon={"download"} />}
        <GenerateCodeButton name={"Generate QR Code"} color={COLORS.primary} onPress={() => generateQRCode()} icon={"qr-code-outline"} />
      </View>
    )
  }


  return (
    <>

      <ScreenWrapper>

        {/* </View> */}
        <>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 20,
            width: SCREEN.width * 0.9,
          }}>
            <EditButton name={"Edit"} />
            <RemoveButton name={"Remove"} color='#EF4444' />
          </View>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <ProfilePicture image={data?.image} onPress={() => { }} />
            <InfoCard />
            <View style={{ marginBottom: 150 }} />
          </View>
        </>

      </ScreenWrapper >
    </>
  );
}

export default RecordDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: "white"
  },
});
