import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import Search from '../../components/textInputs/Search';
import { COLORS } from '../../constants';
import { SCREEN } from '../../constants/theme';
import QRCodeGenerator from '../../services/GenerateQR';


const Records = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <View style={styles.container}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          width: SCREEN.width * 0.9,

        }}>
          <Search label='Search' />
          <TouchableOpacity
            onPress={() => navigation.navigate("add_record")}
            style={{
              height: 40,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLORS.primary
            }}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <ScreenWrapper>
          <View style={{ height: 100 }} />
        </ScreenWrapper>
      </View>
    </>
  );
}

export default Records

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
