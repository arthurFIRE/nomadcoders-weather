import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native";
import axios from 'axios';

const API_KEY = 'ddf2925131fef332803468f3f3bbf31e';

export default class extends React.Component {
  state = {
    isLoading: true
  };



  getWeather = async( latitude, longitude ) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log("weather data : ", data);
  };

  getLocation = async () => {
    try{
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      console.log("coords : ", latitude, longitude);

      this.getWeather(latitude, longitude);
      this.setState( {isLoading: false});
    }catch (e) {
      Alert.alert("Can't find you.", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading/> : null;
  }
}
