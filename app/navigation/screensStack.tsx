import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Register from "../screens/Auth/Register"
import Login from "../screens/Auth/Login"


// MARKETPLACE SCREENS
import RecordDetails from "../screens/Records/RecordDetails"
import Record from "../screens/Records/Records"


//SCAN SCREEN
import { ScanScreen } from "../screens/Scan/ScanMain"
import ScanDetails from "../screens/Scan/ScanDetails"


//INVENTORY SCREEN

import AddRecord from "../screens/Records/AddRecord"

import Tabs from "./tabs"

import { AppContextProvider } from "./AppContextProvider"
import EditRecord from "../screens/Records/EditRecord"

export const RecordsStackScreens = () => {

    const Stack = createStackNavigator()

    return (

        <Stack.Navigator initialRouteName="records" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="records" component={Record} />
            <Stack.Screen name="record_details" component={RecordDetails} />
            <Stack.Screen name="add_record" component={AddRecord} />
            <Stack.Screen name="edit_records" component={EditRecord} />
        </Stack.Navigator>

    )
}

export const ScanStackScreens = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName="scan" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="scan" component={ScanScreen} />
            <Stack.Screen name="scan_details" component={ScanDetails} />
        </Stack.Navigator>
    )
}


export const AuthStack = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
    )
}