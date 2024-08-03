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
import { Confirmations } from "../../components/Confirmations";


import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import app from "../../firebaseConfig";

import { getFirestore } from 'firebase/firestore';
import { deleteFileFromDB } from "../../dbServices/mediaUpload";
import { SmallText } from "../../components/texts/SmallText";

const AddRecord = ({ navigation, route }) => {

  const [modalVisible, setModalVisible] = React.useState(true);
  const [message, setMessage] = useState();
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)


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



  const initialValues = {
    full_name: "",
    household_number: "",
    contact: "",
    card_id: "",
    community: "",
    district: "",
    pre_finance_amount: "",
    farm_input_items: "",
    voice_consent: "",
    image: "",
    unique_id: ""
  };


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



  async function removeImage() {
    try {
      setImage("")
      await deleteFileFromDB(route?.params?.data?.full_name)
    } catch (error) {
      console.log(error)
    }
  }

  // IMAGE UPLOAD LOGIC

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
          (snapshot) => { },
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







  const submitProfile = async (values: typeof initialValues) => {


    try {

      setLoading(true)

      let imageUrl = ""

      if (image !== "") {
        const result: any = await uploadMediaToStorageBucket(
          image,
          "image",
          values?.full_name
        )
        if (result) { imageUrl = result?.fileUrl }
      }

      const uID = values.district.substring(0, 3) + "-" + values.card_id

      // IMAGE UPLOAD LOGIC

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
        unique_id: uID,
        image: imageUrl
      }


      const response = await createRecord(formData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      navigation.navigate("records")
    }

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
            setModalVisible(false);
            navigation.navigate("records");

          }}
          style={{
            backgroundColor: COLORS.red1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            height: 40,
            width: 40,
            borderWidth: 1,
            borderColor: COLORS.red6
          }}>
          <Ionicons name="close" size={25} color={COLORS.red6} />
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
          label="Date of Birth"
        />
        {submit && errors.household_number && (
          <Text style={styles.errorText}>{errors.household_number}</Text>
        )}
        {/* GENDER */}
        <View style={styles.radio_button_View}>
          <View style={{ flexDirection: "row", marginRight: 20, alignItems: "center" }}>
            <RadioButton
              value="male"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
            />
            <Text style={styles.radio_button_text}>Male</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="female"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
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
          label="Region"
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
        <RegularInput
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
              value="True"
              status={preFinance === true ? 'checked' : 'unchecked'}
              onPress={() => setPreFinance(true)}
            />
            <Text style={styles.radio_button_text}>Yes</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="False"
              status={preFinance === false ? 'checked' : 'unchecked'}
              onPress={() => setPreFinance(false)}
            />
            <Text style={styles.radio_button_text}>No</Text>
          </View>
        </View>

        {preFinance ? <>
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
            label="Date of Pre-Finance Issue"
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
              value="True"
              status={farmInput === true ? 'checked' : 'unchecked'}
              onPress={() => setFarmInput(true)}
            />
            <Text style={styles.radio_button_text}>Yes</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="False"
              status={farmInput === false ? 'checked' : 'unchecked'}
              onPress={() => setFarmInput(false)}
            />
            <Text style={styles.radio_button_text}>No</Text>
          </View>
        </View>

        {farmInput ? <>
          <RegularInput
            label="Farm Input Allocated"
            value={values.farm_input}
            onChangeText={handleChange("farm_input_items")}
            onBlur={handleBlur("farm_input_items")}
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
            label="Farm Input Date"
            name={farmInputDate}
            iconName={"chevron-down-circle-outline"}
            onPress={() => toggleFarmInputDatePicker()}
          />
          {submit && errors.household_number && (
            <Text style={styles.errorText}>{errors.household_number}</Text>
          )}
        </> : <></>}

        <View style={{ width: 350, height: 1, backgroundColor: "grey", marginBottom: 20 }} />
        {/* VERBAL CONSENT */}

        <AudioRecord />

        <View style={{ marginBottom: 40 }} />
        <SubmitButton color={COLORS.green6} name={"Add Record"} onPress={() => {
          isSubmit(true);
          handleSubmit();
        }} />
      </View>
    )
  }



  return (
    <>
      <Modal visible={modalVisible} animationType="slide" presentationStyle="formSheet">
        {loading && <Confirmations visible={loading} message={"Adding Record"} icon={"addfile"} />}
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
    fontSize: 15,
    color: "grey"
  }
})


export default AddRecord

