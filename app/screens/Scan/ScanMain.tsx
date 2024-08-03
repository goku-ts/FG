import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity, Image, Modal, ActivityIndicator, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import ScanDetails from './ScanDetails';
import { icons, images } from '../../constants';
import { COLORS, SCREEN } from '../../constants/theme';
import { CameraView, Camera } from "expo-camera";
import { getRecord } from '../../dbServices/recordController';
import { Confirmations } from '../../components/Confirmations';
import { Network } from '../../components/Network';
import { useAppContext } from '../../navigation/AppContextProvider';


export const ScanScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false)
  const {
    networkError,
    setNetworkError
  } = useAppContext()

  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);




  const handleBarCodeScanned = async ({ type, data }) => {
    if (data) setVisible(true)
    console.log(data)
    try {
      const record = await getRecord(data)
      if (record.exists) {
        setVisible(false)
        navigation.navigate("scan_details", { data: record.data() })
      } else {
        console.log("no record found")
        setVisible(false)
        navigation.navigate("scan_details", { data: record.data() })
      }
    } catch (error) {
      console.log(error)
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const ShowCamera = ({ scanned }) => {
    return (
      <>
        {isFocused && <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />}
      </>
    )
  }





  return (
    <View style={styles.container}>
      {networkError && <Network cancel={null} retry={null} visible={networkError} />}
      {visible && <Confirmations visible={visible} message={"Getting Record"} color={COLORS.green1} textColor={COLORS.green9} icon={"scan1"} />}
      <ShowCamera scanned={scanned} />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.background
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    height: SCREEN.height * 0.25,
    width: SCREEN.width * 0.7,
    borderRadius: 20,
    justifyContent: "center",

  },
  button: {

    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

  },
  modalTitle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19
  }
});
