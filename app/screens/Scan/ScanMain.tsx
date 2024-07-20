import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity, Image, Modal, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import ScanDetails from './ScanDetails';
import { icons, images } from '../../constants';
import { SCREEN } from '../../constants/theme';


const item = {
  "name": "TOMATO",
  "description": "vine-ripened goodness",
  "image": "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
  "variety": "Roma",
  "origin": "Western Region",
  "harvest_date": "15 Nov 2023",
  "unit_price": "60",
  "quantity": 25,
  "type": "Organic",
  "isAvailable": true,
  "seller": "Alice Green",
  "id": 2
}

export const ScanScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [callcamera, setCallcamera] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [showIconScreen, setshowIconScreen] = useState(true)

  const isFocused = useIsFocused();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data)
    setshowIconScreen(false)
    setModalVisible(true)
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
        {isFocused && <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />}
      </>
    )
  }

  const IconScreen = ({ onPress }) => {
    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <Image source={icons.scanner} style={{}} />
          <Text style={{ marginTop: 10 }}>Press Here To Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ProceedModal = ({ cancel, proceed, visible }) => {
    return (
      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        animationType='slide'
      >
        <View style={styles.modalContainer}>

          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <Text style={styles.titleText}>Do You Want To Proceed</Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity style={[styles.button, { backgroundColor: "red", }]} onPress={cancel}>
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "green", }]} onPress={proceed}>
                <Text style={styles.buttonText}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }


  return (
    <View style={styles.container}>
      {showIconScreen && <IconScreen onPress={() => setCallcamera(true)} />}
      {callcamera && <ShowCamera scanned={scanned} />}
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      {modalVisible && <ProceedModal
        cancel={() => {
          setshowIconScreen(true)
          setModalVisible(false);
          setCallcamera(false);
          setScanned(false);

        }
        }
        visible={modalVisible}
        proceed={() => {
          setshowIconScreen(true)
          setModalVisible(false);
          setCallcamera(false);
          setScanned(false);
          navigation.navigate("scan_details", { item: item })
        }} />}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white"
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
