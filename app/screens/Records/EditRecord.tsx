import { Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Yup from "yup";

import { SubmitButton } from "../../components/buttons/SubmitButton";
import ProfilePicture from "../../components/ProfilePicture";

import { Dropdown } from "../../components/buttons/Dropdown";

import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';


import { COLORS, SCREEN } from "../../constants/theme";

import Ionicons from '@expo/vector-icons/Ionicons';

import { ScreenWrapper } from "../../components/ScreenWrapper";

import { pickImage } from "../../components/ImagePicker";
import MobileTextInput from "../../components/textInputs/MobileNumberInput";
import RegularInput from "../../components/textInputs/RegularInput";

import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import AudioRecord from "../../components/AudioRecord";
import { MediumText } from "../../components/texts/MediunText";
import { useAppContext } from "../../navigation/AppContextProvider";
import { createRecord } from "../../dbServices/recordController";
import { updateRecord } from "../../dbServices/recordController";
import { Data } from "../../data";
import { useIsFocused } from "@react-navigation/native";


import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import app from "../../firebaseConfig";

import { getFirestore } from 'firebase/firestore';
import { deleteFileFromDB } from "../../dbServices/mediaUpload";


const AddRecord = ({ navigation, route }) => {

  const [data, setData] = React.useState<any>(null)

  const isFocused = useIsFocused();
  const [initialValues, setInitialValues] = React.useState({})


  const [modalVisible, setModalVisible] = React.useState(false);
  const [message, setMessage] = useState();
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    try {
      if (route?.params?.data) {
        console.log("got data")
        setInitialValues({
          id: route?.params?.data?.id,
          full_name: route?.params?.data?.full_name,
          // gender: route?.params?.data?.gender,
          // dob: route?.params?.data?.dob,
          household_number: route?.params?.data?.household_number,
          contact: route?.params?.data?.contact,
          // region: route?.params?.data?.region,
          card_id: route?.params?.data?.card_id,
          community: route?.params?.data?.community,
          district: route?.params?.data?.district,
          // pre_finance: route?.params?.data?.pre_finance,
          pre_finance_amount: route?.params?.data?.pre_finance_amount,
          // farm_input: route?.params?.data?.farm_input,
          farm_input_items: route?.params?.data?.farm_input_items,
          // pre_finance_date: route?.params?.data?.pre_finance_date,
          // farm_input_date: route?.params?.data?.farm_input_date,
          voice_consent: route?.params?.data?.voice_consent,
          unique_id: route?.params?.data?.unique_id,
          // image: route?.params?.data?.image
        })
      } else {
        console.log("no data")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setDateOfBirth(route?.params?.data?.dob)
      setGender(route.params?.data?.gender)
      setSelectedRegion(route?.params?.data?.region)
      setPreFinance(route?.params?.data?.pre_finance)
      setFarmInput(route?.params?.data?.farm_input)
      setPreFinanceDate(route?.params?.data?.pre_finance_date)
      setFarmInputDate(route?.params?.data?.farm_input_date)
      setImage(route?.params?.data?.image)
      setModalVisible(true)
    }


  }, [])







  const sheetRef = useRef<BottomSheetMethods>(null);

  const region = [
    'Western Region',
    'Central Region',
    'Greater Accra Region',
    'Volta Region',
    'Eastern Region',
    'Ashanti Region',
    'Brong-Ahafo Region',
    'Northern Region',
    'Upper East Region',
    'Upper West Region',
    'Oti Region',
    'North East Region',
    'Savannah Region',
    'Western North Region',
    'Bono Region',
    'Ahafo Region'
  ];


  const {
    ImageUrl,
    setImageUrl,
    submit,
    isSubmit,
    selectedRegion,
    setSelectedRegion,
    dropListType,
    setDropListType,
    gender,
    setGender,
    preFinance,
    setPreFinance,
    farmInput,
    setFarmInput,
    preFinanceDate,
    setPreFinanceDate,
    farmInputDate,
    setFarmInputDate,
    date,
    setDate,
    showDateOfBirth,
    setShowDateOfBirth,
    showPreFinanceDatePicker,
    setShowPreFinanceDatePicker,
    dateOfBirth,
    setDateOfBirth,
    showFarmInputDatePicker,
    setShowFarmInputDatePicker
  } = useAppContext()



  // const initialValues = {

  // };


  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full Name is required"),

    dob: Yup.string().required("Date of Birth is required"),
    household_number: Yup.number().required("Household Number is required"),
    contact: Yup.string()
      .required("Mobile Number is required")
      .min(9, "Enter Valid Mobile Number")
      .max(9, "Enter Valid Mobile Number"),
    region: Yup.string().required("Region is required"),
    card_id: Yup.string().required("Card ID is required"),
    community: Yup.string().required("Community is required"),
    district: Yup.string().required("District is required"),
  });



  const storage = getStorage(app);
  const db = getFirestore(app);


  const uploadMediaToStorageBucket = async (
    uri: string,
    fileType: 'image' | undefined,
    fileName: string
  ) => {
    const storageRef = ref(storage, `media/${fileName}`);
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const mediaBlob = await response.blob();
      const upload = uploadBytesResumable(storageRef, mediaBlob);

      return new Promise((resolve, reject) => {
        upload.on(
          'state_changed',
          (snapshot) => {
            console.log(snapshot.bytesTransferred, '/', snapshot.totalBytes);
          },
          (error) => reject(error),
          () => {
            getDownloadURL(upload.snapshot.ref)
              .then((url) => {
                resolve({ fileName, fileUrl: url, fileType });
                setImage(url)
              })
              .catch((error) => reject(error));
          }
        );
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }



  async function removeImage() {
    try {
      setImage("")
      await deleteFileFromDB(route?.params?.data?.full_name)
    } catch (error) {
      console.log(error)
    }
  }


  const submitProfile = async (values) => {

    if (image !== "") {
      const result = await uploadMediaToStorageBucket(
        image,
        "image",
        values?.full_name
      )
    }


    const formData = {
      full_name: values?.full_name,
      gender: gender,
      dob: dateOfBirth,
      household_number: values?.household_number,
      contact: values?.contact,
      region: selectedRegion,
      card_id: values?.card_id,
      community: values?.community,
      district: values?.district,
      pre_finance: preFinance,
      pre_finance_amount: values?.pre_finance_amount,
      farm_input: farmInput,
      farm_input_items: values?.farm_input_items,
      pre_finance_date: preFinanceDate,
      farm_input_date: farmInputDate,
      voice_consent: values?.voice_consent,
      unique_id: values?.unique_id,
      image: image
    }


    try {
      setLoading(true)
      await updateRecord(values?.id, formData)
      console.log(formData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      navigation.navigate("records")
    }

    // const formData = {
    //   full_name: values.full_name,
    //   gender: gender,
    //   dob: dateOfBirth,
    //   household_number: values.household_number,
    //   contact: values.contact,
    //   region: selectedRegion,
    //   card_id: values.card_id,
    //   community: values.community,
    //   district: values.district,
    //   pre_finance_amount: values.pre_finance_amount
    // }
    // console.log(formData)

  };


  // DATE LOGIC

  const toggleDateOfBirthPicker = () => {
    setShowDateOfBirth(!showDateOfBirth)
  }
  const togglePreFinanceDatePicker = () => {
    setShowPreFinanceDatePicker(!showPreFinanceDatePicker)
  }
  const toggleFarmInputDatePicker = () => {
    setShowFarmInputDatePicker(!showFarmInputDatePicker)
  }

  const onChangeDateOfBirth = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate
      //setDate(currentDate)

      setShowDateOfBirth(false)
      setDateOfBirth(currentDate.toDateString())
    } else {
      toggleDateOfBirthPicker()
    }
  }
  const onChangeDateOfPreFinanceIssue = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate
      //setDate(currentDate)

      setShowPreFinanceDatePicker(false)
      setPreFinanceDate(currentDate.toDateString())

    } else {
      togglePreFinanceDatePicker()
    }
  }

  const onChangeDateOfFarmInputIssue = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate
      //setDate(currentDate)

      setShowFarmInputDatePicker(false)
      setFarmInputDate(currentDate.toDateString())

    } else {
      toggleFarmInputDatePicker()
    }
  }



  const Regions = ({ name, onPress }) => {
    return (
      <View style={{ paddingLeft: 40, }}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          style={{ marginBottom: 10 }}
        >
          <View style={{}}>
            <Text style={{ fontSize: 22, marginLeft: 20 }}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const uploadOptions = [
    {
      option: "Upload Image",
      icon: "image-outline"
    }, {
      option: "Take Photo",
      icon: "camera-outline"
    }, {
      option: "Remove Photo",
      icon: "remove-circle-outline"
    }]

  const ImageUploadOptions = ({ name, icon, onPress }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,

          }}>
          <Ionicons name={icon} size={80} />
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
        </TouchableOpacity>
      </>
    )
  }




  const CloseButtonHeader = () => {
    return (
      <View style={{ justifyContent: "space-between", marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
            navigation.navigate("records");

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

  const FormElements = ({ values, errors, handleChange, handleBlur, submit, handleSubmit }) => {
    return (
      <View style={{}}>

        {/* FULL NAME */}
        <RegularInput
          label="Full Name"
          value={values.full_name}
          onChangeText={handleChange("full_name")}
          onBlur={handleBlur("full_name}")}
        />
        {submit && errors.full_name && (
          <Text style={styles.errorText}>{errors.full_name}</Text>
        )}
        {/* DOB*/}
        {showDateOfBirth && <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChangeDateOfBirth}
        />}

        <Dropdown
          name={dateOfBirth}
          iconName={"chevron-down-circle-outline"}
          onPress={() => toggleDateOfBirthPicker()}
          backgroundColor={COLORS.lightGray3}
        />
        {submit && errors.household_number && (
          <Text style={styles.errorText}>{errors.household_number}</Text>
        )}
        {/* GENDER */}
        <MediumText text="Gender" />
        <View style={styles.radio_button_View}>
          <View style={{ flexDirection: "row", marginRight: 20, alignItems: "center" }}>
            <RadioButton
              value="M"
              status={gender === 'M' ? 'checked' : 'unchecked'}
              onPress={() => setGender('M')}
            />
            <Text style={styles.radio_button_text}>Male</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="F"
              status={gender === 'F' ? 'checked' : 'unchecked'}
              onPress={() => setGender('F')}
            />
            <Text style={styles.radio_button_text}>Female</Text>
          </View>
        </View>
        {submit && gender === "" && (
          <Text style={styles.errorText}>Gender is required</Text>
        )}
        {/* HOUSEHOLD NUMBER */}
        <MobileTextInput
          label="Household Number"
          value={values.household_number}
          onChangeText={handleChange("household_number")}
          onBlur={handleBlur("household_number")}
        />
        {submit && errors.household_number && (
          <Text style={styles.errorText}>{errors.household_number}</Text>
        )}
        {/* REGION */}
        <Dropdown
          name={selectedRegion}
          iconName={"chevron-down-circle-outline"}
          onPress={() => { sheetRef.current.open(); setDropListType("region") }}
          backgroundColor={COLORS.lightGray3}
        />
        {submit && errors.household_number && (
          <Text style={styles.errorText}>{errors.household_number}</Text>
        )}
        {/* DISTRICT */}
        <RegularInput
          label="Name of District"
          value={values.district}
          onChangeText={handleChange("district")}
          onBlur={handleBlur("district")}
        />
        {submit && errors.district && (
          <Text style={styles.errorText}>{errors.district}</Text>
        )}

        {/* NAME OF COMMUNITY */}
        <RegularInput
          label="Name of Community"
          value={values.community}
          onChangeText={handleChange("community")}
          onBlur={handleBlur("community")}
        />
        {submit && errors.community && (
          <Text style={styles.errorText}>{errors.community}</Text>
        )}
        {/* CONTACT INFORMATION */}
        <MobileTextInput
          label="Contact Information"
          value={values.contact}
          onChangeText={handleChange("contact")}
          onBlur={handleBlur("contact")}
        />
        {submit && errors.contact && (
          <Text style={styles.errorText}>{errors.contact}</Text>
        )}
        {/* GHANA CARD ID */}
        <MobileTextInput
          label="Ghana Card ID"
          value={values.card_id}
          onChangeText={handleChange("card_id")}
          onBlur={handleBlur("card_id")}
        />
        {submit && errors.card_id && (
          <Text style={styles.errorText}>{errors.card_id}</Text>
        )}

        <View style={{ width: 350, height: 1, backgroundColor: "grey", marginBottom: 20 }} />




        {/* REQUEST FOR PRE FINANCE */}
        <MediumText text="Request for Pre-Finance" />
        <View style={styles.radio_button_View}>
          <View style={{ flexDirection: "row", marginRight: 20, alignItems: "center" }}>
            <RadioButton
              value="Yes"
              status={preFinance === "Yes" ? 'checked' : 'unchecked'}
              onPress={() => setPreFinance("Yes")}
            />
            <Text style={styles.radio_button_text}>Yes</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={preFinance === "No" || preFinance === "" ? 'checked' : 'unchecked'}
              onPress={() => setPreFinance("No")}
            />
            <Text style={styles.radio_button_text}>No</Text>
          </View>
        </View>

        {preFinance === "Yes" ? <>
          <MobileTextInput
            label="Amount Allocated"
            value={values.pre_finance_amount}
            onChangeText={handleChange("pre_finance_amount")}
            onBlur={handleBlur("pre_finance_amount")}
          />
          {submit && errors.contact && (
            <Text style={styles.errorText}>{errors.contact}</Text>
          )}

          {showPreFinanceDatePicker && <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChangeDateOfPreFinanceIssue}
          />}
          <Dropdown
            name={preFinanceDate}
            iconName={"chevron-down-circle-outline"}
            onPress={() => togglePreFinanceDatePicker()}
            backgroundColor={COLORS.lightGray3}
          />
          {submit && errors.household_number && (
            <Text style={styles.errorText}>{errors.household_number}</Text>
          )}
        </> : <></>}




        {/* REQUEST FOR FARM INPUT */}
        <MediumText text="Request for Farm Input" />
        <View style={styles.radio_button_View}>
          <View style={{ flexDirection: "row", marginRight: 20, alignItems: "center" }}>
            <RadioButton
              value="Yes"
              status={farmInput === "Yes" ? 'checked' : 'unchecked'}
              onPress={() => setFarmInput("Yes")}
            />
            <Text style={styles.radio_button_text}>Yes</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={farmInput === "No" || preFinance === "" ? 'checked' : 'unchecked'}
              onPress={() => setFarmInput("No")}
            />
            <Text style={styles.radio_button_text}>No</Text>
          </View>
        </View>

        {farmInput === "Yes" ? <>
          <MobileTextInput
            label="Farm Input Allocated"
            value={values.farm_input}
            onChangeText={handleChange("pre_finance_amount")}
            onBlur={handleBlur("pre_finance_amount")}
          />
          {submit && errors.contact && (
            <Text style={styles.errorText}>{errors.contact}</Text>
          )}
          {showFarmInputDatePicker && <DateTimePicker
            mode="date"
            display="calendar"
            value={date}
            onChange={onChangeDateOfFarmInputIssue}
          />}
          <Dropdown
            name={farmInputDate}
            iconName={"chevron-down-circle-outline"}
            onPress={() => toggleFarmInputDatePicker()}
            backgroundColor={COLORS.lightGray3}
          />
          {submit && errors.household_number && (
            <Text style={styles.errorText}>{errors.household_number}</Text>
          )}
        </> : <></>}

        <View style={{ width: 350, height: 1, backgroundColor: "grey", marginBottom: 20 }} />
        {/* VERBAL CONSENT */}

        <AudioRecord />

        <View style={{ marginBottom: 40 }} />
        <SubmitButton color={COLORS.primary} name={"Add Record"} isLoading={loading} onPress={() => {
          isSubmit(true);
          handleSubmit();

          //setModalVisible(false)
          //navigation.navigate("records")
        }} />
      </View>
    )
  }



  return (
    <>
      <Modal visible={modalVisible} animationType="slide" presentationStyle="formSheet">
        <ScreenWrapper>
          <Formik
            initialValues={initialValues}
            //validationSchema={validationSchema}
            onSubmit={submitProfile}>
            {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
              <>
                <CloseButtonHeader />
                <View style={{ alignItems: "center", marginBottom: 50 }}>
                  <ProfilePicture image={image} onPress={() => { sheetRef.current.open(); setDropListType("uploadOptions") }} />
                  <FormElements
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    submit={submit}
                  />
                </View>
              </>
            )}
          </Formik>
        </ScreenWrapper>


        <BottomSheet ref={sheetRef} height={SCREEN.height * 0.3}>
          {dropListType == "region" && <FlatList
            data={region}
            renderItem={({ item }) =>
              <Regions
                name={item}
                onPress={() => { sheetRef.current.close(); setSelectedRegion(item) }}
              />
            }
          />}

          {dropListType === "uploadOptions" &&
            <View style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}>
              <ImageUploadOptions
                name={uploadOptions[0].option}
                icon={uploadOptions[0].icon}
                onPress={() => { sheetRef.current.close(); pickImage(setImage) }}

              />
              <ImageUploadOptions
                name={uploadOptions[1].option}
                icon={uploadOptions[1].icon}
                onPress={() => { sheetRef.current.close(); pickImage(setImage, "camera") }}

              />
              <ImageUploadOptions
                name={uploadOptions[2].option}
                icon={uploadOptions[2].icon}
                onPress={() => { sheetRef.current.close(); setImage(""); removeImage() }}

              />
            </View>

          }
        </BottomSheet>
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
  },
  radio_button_View: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginLeft: -5,
    marginTop: 10
  },
  radio_button_text: {
    fontSize: 18,
    color: "grey"
  }
})


export default AddRecord
