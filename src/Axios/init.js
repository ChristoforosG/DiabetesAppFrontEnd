import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_info";

export const init = () => {
  axios.defaults.baseURL = "http://192.168.1.62:8000/";
  axios.interceptors.request.use(
    async (config) => {
      try {
        const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
        config["headers"] = {
          Authorization: "Bearer " + JSON.parse(userInfo)["access"],
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      } catch (error) {
        console.log("Request Interceptor error message: " + error);
      }
      return config;
    },
    function (error) {
      console.log("Interceptor Error:" + error);
      return Promise.reject(error);
    }
  );

  // axios.interceptors.response.use((response) => {
  //     if (response.status !== 200) {
  //         console.log(response.status)
  //     }
  //     return response
  // }, async (error) => {
  //     if (error.response.status === 401) {
  //         const userInfo = await AsyncStorage.getItem(STORAGE_KEY)
  //         console.log(userInfo)
  //     }
  //     return Promise.reject(error)
  // })
};

export const newAccessToken = async () => {
  const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
  console.log(userInfo);
};
