import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UNAUTHORIZED = 401;
const STORAGE_KEY = "@user_info";
const serverIP = "192.168.1.151";
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
    (config) => {
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
