import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import Search from '../../components/textInputs/Search';
import { COLORS } from '../../constants';
import { SCREEN } from '../../constants/theme';
import { useFocusEffect } from '@react-navigation/core';
import { LabelCard } from '../../components/cards/LabelCard';
import ListingCard from '../../components/cards/RecordCard';
import { FlashList } from "@shopify/flash-list"
import { Data } from '../../data';
import RecordCard from '../../components/cards/RecordCard';
import { Wrapper } from '../../components/Wrapper';
import { getAllRecords, getRecentUpdates } from '../../dbServices/recordController';
import { useIsFocused } from '@react-navigation/native';
import { storage } from '../../services/localStorage';
import { Confirmations } from '../../components/Confirmations';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Timestamp } from 'firebase/firestore';

const Records = ({ navigation }) => {

  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [lastSyncTime, setLastSyncTime] = useState(Timestamp.fromDate(new Date(0)));
  const [searchQuery, setSearchQuery] = useState('');

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



  // useEffect(() => {
  //   // Fetch updates when the component mounts
  //   fetchRecentUpdates();
  // }, []);



  // const fetchRecentUpdates = async () => {
  //   try {
  //     const newUpdates = await getRecentUpdates(lastSyncTime);
  //     setRecords(newUpdates);
  //     if (newUpdates.length > 0) {
  //       setLastSyncTime(newUpdates[newUpdates.length - 1].lastUpdated);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching recent updates:", error);
  //   } finally {
  //     setRefreshing(false)
  //   }
  // };






  const isFocused = useIsFocused();

  useEffect(() => {
    async function getD() {
      try {
        // setRefreshing(true)
        const data = await getAllRecords()
        setRecords(data)
        console.log("rendered")
      } catch (error) {
        console.log(error)
      } finally {
        // setRefreshing(false)
      }
    }
    getD()
  }, [])



  async function getD() {
    try {
      setRefreshing(true)
      const data = await getAllRecords()
      setRecords(data)

    } catch (error) {
      console.log(error)
    } finally {
      setRefreshing(false)
    }
  }




  const filteredData = records.filter(item =>
    item.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(({ item }) => (
    <RecordCard
      key={item.unique_id}
      name={item.full_name}
      gender={item.gender}
      region={item.region}
      community={item.community}
      profile={item.image}
      onPress={() => navigation.navigate("record_details", { item })} />
  ), []);

  // const keyExtractor = useCallback((item) => item._id, []);
  // const filteredproducts = products.filter((product, i) =>
  // product.bp_product_name.toLowerCase().includes(search.toLowerCase())
  //  );

  return (
    <>
      <View style={styles.container}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 40,
          width: SCREEN.width * 0.9,
          marginLeft: 5
          // backgroundColor: COLORS.background
        }}>
          <Search
            label='Search...'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("add_record")}
            style={{
              height: 40,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.green1,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLORS.green5,
              marginRight: 10
            }}
          >
            <Ionicons name="person-add-outline" size={24} color={COLORS.green9} />
          </TouchableOpacity>
        </View>
        <Wrapper>
          {refreshing && <Confirmations visible={true} message={"Syncing Records"} icon={"sync"} />}
          {/* {refreshing ? <ActivityIndicator /> : null} */}
          <View style={{
            width: SCREEN.width * 0.9,
            height: SCREEN.height * 1,
            marginBottom: 100,
            backgroundColor: COLORS.background
          }}>
            <FlashList
              // keyExtractor={item => item}
              estimatedItemSize={600}
              // initialNumToRender={50}
              // updateCellsBatchingPeriod={50}
              // maxToRenderPerBatch={10}
              refreshControl={<RefreshControl refreshing={false} onRefresh={getD} />}
              data={searchQuery === "" ? records : filteredData}

              renderItem={renderItem} />

          </View>
          <View style={{ height: 100 }} />
        </Wrapper>
      </View>
    </>
  );
}

export default Records

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
});
