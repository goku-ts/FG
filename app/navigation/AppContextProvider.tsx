import React, { useState } from "react";
import { useContext, createContext } from "react";

type AppContextProviderProps = {

}

const ContextProvider = createContext<any>({});
export const AppContextProvider = ({ children }: any) => {


    const [submit, isSubmit] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("Choose Region")
    const [dropListType, setDropListType] = useState("region")
    const [gender, setGender] = React.useState('');


    const [preFinance, setPreFinance] = useState("No")
    const [farmInput, setFarmInput] = useState("No")
    const [preFinanceDate, setPreFinanceDate] = useState("Date Of Issuance")
    const [farmInputDate, setFarmInputDate] = useState("Date Of Issuance")
    const [date, setDate] = useState(new Date())

    const [showDateOfBirth, setShowDateOfBirth] = useState(false)
    const [showPreFinanceDatePicker, setShowPreFinanceDatePicker] = useState(false)
    const [dateOfBirth, setDateOfBirth] = useState("Date Of Birth")
    const [showFarmInputDatePicker, setShowFarmInputDatePicker] = useState(false)
    const [networkError, setNetworkError] = useState(false)


    return (
        <ContextProvider.Provider value={{
            networkError, setNetworkError,
            submit, isSubmit,
            selectedRegion, setSelectedRegion,
            dropListType, setDropListType,
            gender, setGender,
            preFinance, setPreFinance,
            farmInput, setFarmInput,
            preFinanceDate, setPreFinanceDate,
            farmInputDate, setFarmInputDate,
            date, setDate,
            showDateOfBirth, setShowDateOfBirth,
            showPreFinanceDatePicker, setShowPreFinanceDatePicker,
            dateOfBirth, setDateOfBirth,
            showFarmInputDatePicker, setShowFarmInputDatePicker
        }}>
            {children}
        </ContextProvider.Provider>
    );
};

export const useAppContext = () => useContext(ContextProvider)