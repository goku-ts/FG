import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  BackHandler
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import app from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword, initializeAuth, } from "firebase/auth";

import ReactNativeAsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';


import MobileTextInput from "../../components/textInputs/MobileNumberInput";
import PasswordTextInput from "../../components/textInputs/PasswordInput";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { COLORS, images } from "../../constants";
import { SCREEN } from "../../constants/theme";
import RegularInput from "../../components/textInputs/RegularInput";
import { useFocusEffect } from "@react-navigation/core";

const Login = ({ navigation, route }) => {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Are you sure', 'Do you really want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );




  const initialValues = {
    email: "",
    password: "",
  };

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false)


  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email")
    ,
    password: Yup.string().required("Password is required"),
  });



  const handleSignIn = (values: typeof initialValues) => {
    setLoading(true)
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        setLoading(false)
        const user = userCredential.user;
        navigation.navigate("Home", { screen: "RecordsStackScreens" })
        // ...
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage)
      });
  };

  const [submit, isSubmit] = useState(false);

  return (
    <>
      <ScreenWrapper>
        <View style={styles.container}>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
              <View >
                <View style={{ justifyContent: "center", alignItems: "center", height: SCREEN.height * 0.1 }}>
                  <Image source={images.logo} style={{ height: 150, width: 200, marginBottom: 50 }} />
                </View>

                {message && (
                  <Text style={[styles.errorText, { fontSize: 12 }]}>{message}</Text>
                )}
                <RegularInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {submit && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}


                <PasswordTextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}

                />
                {submit && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <SubmitButton color={COLORS.green6} isLoading={loading} name={"Login"} onPress={() => {
                  isSubmit(true);
                  handleSubmit();
                }} />
              </View>
            )}
          </Formik>
        </View>
      </ScreenWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SCREEN.height * 0.15,
    alignItems: "center",
  },
  // input: {
  //   width: 300,
  //   height: 40,
  //   borderColor: "black",
  //   borderWidth: 1,
  //   borderRadius: 15,
  //   marginBottom: 8,
  //   paddingHorizontal: 8,
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  passwordContainer: {
    width: 300,
    height: 40,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    flexDirection: "row",

    alignItems: "center",
  },
  visibilityToggle: {
    marginLeft: 8,
    color: "blue",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
    marginTop: -5
  },
  signUpLink: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    height: 35,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  // fieldsandbutton: {
  //   alignItems: "center",
  // },
  icon: {
    marginRight: 10,
  },
  passwordandtoggle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 10
  },
  footerText: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default Login;


