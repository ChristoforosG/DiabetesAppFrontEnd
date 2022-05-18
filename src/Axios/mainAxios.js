import axios from "axios";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { acc } from "react-native-reanimated";

const UNAUTHORIZED = 401;
const STORAGE_KEY = "@user_info";
const serverIP = "192.168.1.151";

const newAccessToken = async (userInfo) => {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const tokens = await axios.post(
    "http://" + serverIP + ":8000/api/token/refresh/",
    {
      refresh: userInfo.refresh,
    },
    config
  );
  userInfo.access = tokens.data.access;
  userInfo.refresh = tokens.data.refresh;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
  return userInfo.access;
};

const client = () => {
  const defaultOptions = {
    baseURL: "http://" + serverIP + ":8000/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      try {
        const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
        const DecodedToken = jwt(JSON.parse(userInfo).access);
        const duration = DecodedToken.exp - Date.now() / 1000;
        console.log("Token Expiration: " + duration);
        if (duration < 60.0) {
          const access = await newAccessToken(JSON.parse(userInfo));
          config.headers.Authorization = "Bearer " + access;
        } else {
          config.headers.Authorization =
            "Bearer " + JSON.parse(userInfo)["access"];
        }
      } catch (error) {
        console.log("Main Axios Error:" + error);
        config.headers.Authorization = "Bearer NoToken";
      }
      return config;
    },
    function (error) {
      console.log("Interceptor Error:" + error);
      return Promise.reject(error);
    }
  );
  return instance;
};

export default client();
