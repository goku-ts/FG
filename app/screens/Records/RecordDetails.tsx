import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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

const RecordDetails = ({ navigation, route }) => {


  const [data, setData] = React.useState<any>()
  React.useEffect(() => {
    // let getData = route?.params?.item
    setData(Data[0])
  }, [])



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
        height: SCREEN.height * 0.9,
        borderWidth: 0.1,
        borderRadius: 1,
        elevation: 0.5,
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
      </View>
    )
  }


  return (
    <>

      <ScreenWrapper>

        {/* </View> */}

        <View style={{ marginTop: 10, alignItems: "center" }}>
          <ProfilePicture image={data?.image} onPress={() => { }} />
          <InfoCard />
          <View style={{ marginBottom: 100, marginTop: 100 }} />
        </View>

      </ScreenWrapper>
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
  }
});
