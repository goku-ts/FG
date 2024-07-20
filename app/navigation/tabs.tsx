import React, { useState } from "react";
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons, COLORS, SIZES } from "../constants";
import PrrofileScreen from "../screens/Profile";
import Settings from "../screens/Settings";
import { scale } from "react-native-size-matters";

import { RecordsStackScreens, ScanStackScreens, } from "./screensStack";
import { SCREEN } from "../constants/theme";

const Tab = createBottomTabNavigator();


const Tabs = () => {
    const [userCategory, setUserCategory] = useState("seller")
    // React.useEffect(() => {
    //    setUserCategory("aggregator")
    // }, [])


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: true,
                headerShown: false,
                headerShadowVisible: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: "bold",
                    marginBottom: 10
                },
                tabBarStyle: {
                    height: SCREEN.height * 0.08,
                    paddingTop: 5,
                    borderTopWidth: 0.5,
                    backgroundColor: COLORS.white,
                    position: "absolute",
                    bottom: 20,
                    left: 10,
                    right: 10,
                    borderRadius: 40
                },
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.primary : COLORS.lightGray4;

                    switch (route.name) {
                        case "Records":
                            return (
                                <Image
                                    source={icons.market_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )


                        case "Settings":
                            return (
                                <Image
                                    source={icons.inventory_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Scan":
                            return (
                                <Image
                                    source={icons.scan_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                    }
                }
            })}
        >

            <Tab.Screen
                name="Records"
                component={RecordsStackScreens}
            />

            <Tab.Screen
                name="Scan"
                component={ScanStackScreens}
            />





            <Tab.Screen
                name="Settings"
                component={Settings}
            />



        </Tab.Navigator>
    )
}

export default Tabs;