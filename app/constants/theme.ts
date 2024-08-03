import { Dimensions } from "react-native";

import { StatusBar } from "expo-status-bar";

export const COLORS = {

    gray1: "#F3F4F6",
    gray2: "#E5E7EB",
    gray3: "#D1D5DB",
    gray4: "#9CA3AF",
    gray5: "#6B7280",
    gray6: "#4B5563",
    gray7: "#374151",
    gray8: "#1F2937",
    gray9: "#111827",


    green1: "#dcfce7",
    green2: "#bbf7d0",
    green3: "#86efac",
    green4: "#4ade80",
    green5: "#22c55e",
    green6: "#16a34a",
    green7: "#15803d",
    green8: "#166534",
    green9: "#14532d",


    red1: "#FEE2E2",
    red2: "#FECACA",
    red3: "#FCA5A5",
    red4: "#F87171",
    red5: "#EF4444",
    red6: "#dc2626",
    red7: "#B91C1C",
    red8: "#991b1b",
    red9: "#7F1D1D",


    orange1: "#FFEDD5",
    orange2: "#FED7AA",
    orange3: "#FDBA74",
    orange4: "#FB923C",
    orange5: "#F97316",
    orange6: "#EA580C",
    orange7: "#C2410C",
    orange8: "#9A3412",
    orange9: "#7C2D12",


    teal1: "#ccfbf1",
    teal2: "#99f6e4",
    teal3: "#5eead4",
    teal4: "#2dd4bf",
    teal5: "#14b8a6",
    teal6: "#0d9488",
    teal7: "#0f766e",
    teal8: "#115e59",
    teal9: "#134e4a",


    background: "white",
    // base colors
    primary1: "#dcfce7",
    primary2: "#86efac",
    primary3: "#4ade80",
    primary4: "#22c55e",
    primary5: "#16a34a",
    primary6: "#166534",
    secondary1: "#FB923C",
    secondary2: "#F97316",
    secondary3: "#EA580C",
    tertiary1: "#FB7185",
    tertiary2: "#F43F5E",
    tertiary3: "#FBBF24",

    // colors
    black: "#1E1B26",
    white: "white",
    lightGray: "#64676D",
    lightGray2: "#EFEFF0",
    lightGray3: 'white',
    lightGray4: '#7D7E84',
};

export const SCREEN = {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
}


const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    xLarge: 20,
    xxLarge: 24,
    xxxLarge: 28,
    xxxxLarge: 32
}

const FAMILY = {
    roboto: "Roboto-regular"
}

export const FONTS = {
    xSmall: { fontFamily: FAMILY.roboto, fontSize: SIZES.xSmall, lineHeight: 36 },
    small: { fontFamily: FAMILY.roboto, fontSize: SIZES.small, lineHeight: 30 },
    medium: { fontFamily: FAMILY.roboto, fontSize: SIZES.medium, lineHeight: 22 },
    large: { fontFamily: FAMILY.roboto, fontSize: SIZES.large, lineHeight: 22 },
    xLarge: { fontFamily: FAMILY.roboto, fontSize: SIZES.xLarge, lineHeight: 22 },
    xxLarge: { fontFamily: FAMILY.roboto, fontSize: SIZES.xxLarge, lineHeight: 22 },
    xxxLarge: { fontFamily: FAMILY.roboto, fontSize: SIZES.xxxLarge, lineHeight: 22 },
    xxxxLarge: { fontFamily: FAMILY.roboto, fontSize: SIZES.xxxxLarge, lineHeight: 22 },
};




const appTheme = { COLORS, SIZES, FONTS, SCREEN };

export default appTheme;