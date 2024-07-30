import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid, Platform, Alert, Modal } from 'react-native';
import { COLORS } from '../../constants';

import { dataType } from '../../data';

import { Wrapper } from '../../components/Wrapper';
import { SCREEN } from '../../constants/theme';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
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
import { deleteRecord, getAllRecords } from '../../dbServices/recordController';
import { deleteFileFromDB } from '../../dbServices/mediaUpload';



const RecordDetails = ({ navigation, route }) => {
  const [data, setData] = React.useState<any>()
  const [modalVisible, setModalVisible] = React.useState(true);

  React.useEffect(() => {
    let getData = route?.params?.data
    setData(getData)
  }, [])

  // const [qrValue, setQRValue] = useState('x.com');
  // const [isActive, setIsActive] = useState(false);
  // const [qrImage, setQRImage] = useState('');
  // const [qrName, setQRName] = useState("user");




  // const ref = React.useRef<any>();

  // const generateQRCode = () => {
  //   setQRName(data?.full_name)

  //   if (!qrValue) return;
  //   setIsActive(true);
  // };






  // function downloadQR(name) {
  //   ref.current.toDataURL(async (data: string) => {

  //     try {
  //       let fileUri = FileSystem.documentDirectory + `${name}.png`;
  //       await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });

  //       const asset = await MediaLibrary.createAssetAsync(fileUri);
  //       await MediaLibrary.createAlbumAsync("Download", asset, false);

  //       console.log('QR code saved successfully');
  //     } catch (error) {
  //       console.log('Error saving QR code:', error);
  //     }
  //   });

  // }


  // const DeleteRecord = () => {
  //   Alert.alert('Are you sure', 'Do you really want to delete this record?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'YES', onPress: async () => {
  //         try {
  //           await deleteRecord(data?.id)
  //           await deleteFileFromDB(data?.full_name)
  //         } catch (error) {
  //           console.log(error)
  //         }
  //         navigation.navigate("records")
  //       }
  //     },
  //   ])
  // }



  const CloseButtonHeader = () => {
    return (
      <View style={{ justifyContent: "space-between", marginBottom: 10, marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate("scan");

          }}
          style={{
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            height: 40,
            width: 40,
          }}>
          <Ionicons name="close" size={25} />
        </TouchableOpacity>
      </View>
    )
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
        height: SCREEN.height * 0.8,
        // borderWidth: 0.1,
        // borderRadius: 1,
        // elevation: 0.5,
        alignItems: "center",
      }}>
        <View style={{ marginBottom: 20 }} />
        <LabelCard label={"Unique ID"} details={data?.unique_id} />
        <LabelCard label={"Full Name"} details={data?.full_name} />
        <LabelCard label={"Gender"} details={data?.gender} />
        <LabelCard label={"DOB"} details={data?.dob} />
        <LabelCard label={"Contact"} details={data?.contact} />
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
      </View>
    )
  }


  return (
    <>
      <Modal visible={modalVisible} animationType="slide" presentationStyle="formSheet">
        <ScreenWrapper>
          <CloseButtonHeader />
          {/* </View> */}
          <View style={styles.container}>
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <ProfilePicture image={data?.image} onPress={() => { }} />
              <InfoCard />
            </View>
          </View>

        </ScreenWrapper >
      </Modal>
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
    backgroundColor: "white"
  },
});
