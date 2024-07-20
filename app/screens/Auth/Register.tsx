import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { SubmitButton } from "../../components/buttons/SubmitButton";


import RegularInput from "../../components/textInputs/RegularInput";
import MobileTextInput from "../../components/textInputs/MobileNumberInput";
import PasswordTextInput from "../../components/textInputs/PasswordInput";



import { COLORS, SCREEN } from "../../constants/theme";
import { images } from "../../constants";

import { ScreenWrapper } from "../../components/ScreenWrapper";

const Register = ({ navigation }) => {
  const [submit, isSubmit] = useState(false);
  const [message, setMessage] = useState()

  const initialValues = {
    name: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone_number: Yup.number()
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = (values: typeof initialValues) => {
    const baseIP = "https://977b-102-176-65-188.ngrok-free.app/user/signup";
    // Perform signup logic here
    axios
      .post(baseIP, {
        name: values.name,
        phone_number: values.phone_number,
        password: values.password
      })
      .then((response) => {
        setMessage(response?.data?.message)
        if (response?.data?.status === "SUCCESS") {
          navigation.navigate("Signin")
        }
      })
      .catch((e) => console.log(e));

  };

  return (
    <>
      <ScreenWrapper>

        <View style={styles.container}>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View style={{}}>
                {message && <Text style={[styles.errorText, { fontSize: 12 }]}>{message}</Text>}

                <ScrollView contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
                  <View style={{ justifyContent: "center", alignItems: "center", height: SCREEN.height * 0.1 }}>
                    <Image source={images.logo} />
                  </View>

                  {submit && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                  <RegularInput
                    label="Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    outlineColor={errors.name ? "red" : null}
                  />


                  {submit && errors.phone_number && (
                    <Text style={styles.errorText}>{errors.phone_number}</Text>
                  )}

                  <MobileTextInput
                    label="Mobile Number"
                    value={values.phone_number}
                    onChangeText={handleChange("phone_number")}
                    outlineColor={errors.phone_number ? "red" : null}
                  />


                  {submit && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <PasswordTextInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    outlineColor={errors.password ? "red" : null}
                  />


                  {submit && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}
                  <PasswordTextInput
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    outlineColor={errors.password ? "red" : null}
                  />



                  <SubmitButton color={COLORS.primary} name={"Register"} onPress={() => {
                    isSubmit(true);
                    handleSubmit();
                  }} />
                </ScrollView>
              </View>
            )}
          </Formik>

          <Text
            onPress={() => navigation.navigate("login", {})}
            style={styles.signInLink}>Already have an account? Sign in</Text>
        </View>
      </ScreenWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


    paddingTop: StatusBar.currentHeight,
    //  marginTop : SCREEN.height * 0.1
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
  },
  signInLink: {
    marginTop: 16,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    width: SCREEN.width * 0.85,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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

export default Register;
