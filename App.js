import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { dummyData } from './src/exports';
import ViewShot from "react-native-view-shot";
import axios from 'axios';



const mark = require("./src/assets/icons/location.png")
const charging = require("./src/assets/icons/charging.png")
const direction = require("./src/assets/icons/send.png")


const api_url = "http://3.7.20.173:8503/api/upload"   // not working !!


const App = () => {

  const viewShot = useRef()

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [ECharge, setECharge] = useState(dummyData.cities)

  const [screenShot, setScreenShot] = useState(dummyData.cities)


  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);


  let photo = {
    uri: screenShot,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };

  let formData = new FormData();

  formData.append('image', photo);


  axios({
    method: 'POST',
    url: api_url + 'customer/upload-avatar',
    data: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data;'
    }
  }).then((response) => { console.log(response) })
    .catch((error) => {
      console.log("error", error.response)
    });


  return (
    <SafeAreaView style={styles.container}>
      <ViewShot
        style={{ flex: 1 }}
        ref={viewShot} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
        <View style={styles.subContainer}>

          <MapView
            style={[styles.map, {
              width: "100%",
              height: "100%"
            }]}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            showsUserLocation={true}

          >
            <Marker coordinate={position}

            >
              <Image
                source={mark}
                style={{ width: 30, height: 30 }}
                resizeMode="cover"
                resizeMethod="resize"
              />
            </Marker>

            {
              ECharge?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{ width: 50, height: 50 }}>
                    <Marker

                      coordinate={item.places}
                      identifier={item.id}
                      onPress={() => {
                        setECharge(item)
                      }}
                    >
                      <View style={styles.markerCircle}>
                        <Text>{item.id}</Text>
                      </View>


                    </Marker>
                  </View>
                )
              })}



          </MapView>


          <TouchableOpacity
            style={styles.takeShot}

            onPress={() => {
              viewShot.current.capture().then(uri => {
                setScreenShot(uri)
                alert(uri)
              })
            }}
          >
            <Text style={{ color: "#fff" }}>Take shot</Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollList}
          >
            {
              ECharge.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={styles.card}
                  >
                    <View style={{ padding: 10 }}>

                      <View style={styles.cardNameContainer}>
                        <View>
                          <Text style={{ color: "#fff", }}>{item.name}</Text>
                          <Text style={{ fontSize: 10, color: "#aaa", }}>{item.address}</Text>
                        </View>

                        <Image
                          source={direction}
                          resizeMode="contain"
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: "red"
                          }}
                        />
                      </View>

                      <Text style={{ fontSize: 10, color: "#00FFAB", marginTop: 20 }}>SUPPORTED CONNECTION</Text>
                      {
                        item?.connector_types?.map((item, index) => (
                          <View 
                          key={index}
                          style={styles.connector}>
                            <Image
                              source={charging}
                              resizeMode="contain"
                              style={{
                                width: 25,
                                height: 25,
                                tintColor: "#fff"
                              }}
                            />
                            <View>
                              <Text style={{ color: "#fff" }}>{item.level}</Text>
                              <Text style={{ fontSize: 10, color: "#00FFAB", }}>15W Fast Charging</Text>
                            </View>

                            <View>
                              <Text style={{ color: "#fff" }}>X{item.speed}</Text>
                            </View>

                          </View>
                        ))
                      }

                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </ViewShot>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  subContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollList: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,

  },
  card: {

    backgroundColor: "#333",
    borderRadius: 10,
    marginHorizontal: 10,

    height: 230,
    width: 200,
    // overflow: "hidden",
  },
  markerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "aqua",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain"
  },
  takeShot: {
    position: "absolute",
    top: 60,
    left: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  cardNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  connector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  }
})