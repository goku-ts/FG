import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS } from '../../constants';


import { ScreenWrapper } from '../../components/ScreenWrapper';

import { SCREEN } from '../../constants/theme';


import { SubmitButton } from '../../components/buttons/SubmitButton';
import { OutlineButton } from '../../components/buttons/OutlineButton copy';
import { placeholder } from '../../constants/images';

const ScanDetails = ({ navigation, route }) => {


  const [data, setData] = React.useState<any>()
  React.useEffect(() => {
    let getData = route?.params?.item
    setData(getData)
  }, [])


  return (
    <>

      <ScreenWrapper>

        {/* <View style={{ height: SCREEN.height * 0.2, width: SCREEN.width , justifyContent: "center", alignItems: "center" }}> */}
        {
          data?.image ? <Image source={{ uri: data?.image }} style={styles.banner} />
            : <Image source={placeholder} style={styles.banner} />
        }
        {/* </View> */}
        <View style={{}}>
          <View style={{ marginTop: 10, alignItems: "center" }}>

            <SubmitButton name={`Contact   ${data?.seller}`} color={COLORS.primary} />
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
}

export default ScanDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    height: SCREEN.height * 0.3,
    width: SCREEN.width,
    marginLeft: -10
  }
});
