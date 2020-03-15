import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native";
import axios from 'axios';
import Weather from "./Weather";

const API_KEY = 'ddf2925131fef332803468f3f3bbf31e';

export default class extends React.Component {
  state = {
    isLoading: true,
    temp: 0
  };

  getWeather = async( latitude, longitude ) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    console.log("weather data : ", data);

    this.setState( {isLoading: false, temp: data.main.temp });
  };

  getLocation = async () => {
    try{
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      console.log("coords : ", latitude, longitude);

      this.getWeather(latitude, longitude);

    }catch (e) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading/> : <Weather temp={ Math.round(temp) } />;
  }
}
