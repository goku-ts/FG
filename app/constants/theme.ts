import { Dimensions } from "react-native";

import { StatusBar } from "expo-status-bar";

export const COLORS = {
    // base colors
    primary: "#2fa836",
    primary2: "#84bb27",
    primary3: "#b6d999",
    secondary: "#74b47c",
    secondary2: "#c4dcb4",

    // colors
    black: "#1E1B26",
    white: "white",
    lightGray: "#64676D",
    lightGray2: "#EFEFF0",
    lightGray3: 'white',
    lightGray4: '#7D7E84',
    gray: "#2D3038",
    gray1: "#282C35",
    darkRed: "#31262F",
    lightRed: "#C5505E",
    darkBlue: "#22273B",
    lightBlue: "#424BAF",
    darkGreen: "#213432",
    lightGreen: "#31Ad66",

};

export const SCREEN = {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
}

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 14.5,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,


};


export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS, SCREEN };

export default appTheme;