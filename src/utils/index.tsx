import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../constants";

const arrayRemovedItem = (item: any, array: any[]) => {
  const result = array;
  const removeItemIndex = array.findIndex((atom) => atom === item);
  // console.log(removeItemIndex, "removeItemIndex");
  if (removeItemIndex !== -1) {
    result.splice(removeItemIndex, 1);
  }
  return result;
};

const saveSecureLocalStorage = (itemName: string, item: any) => {
  const cipherData = CryptoJS.AES.encrypt(
    JSON.stringify(item),
    SECRET_KEY
  ).toString();
  window.localStorage.setItem(itemName, cipherData);
};

const getSecureLocalStorage = (itemName: string) => {
  const cipherData = window.localStorage.getItem(itemName);
  if (!cipherData) return undefined;
  const bytes = CryptoJS.AES.decrypt(cipherData, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(bytes);
};

const avoidLocalStorageUndefined = (itemName: string, initialData: any) => {
  if (typeof window === "undefined") return initialData;
  const localStorageData = getSecureLocalStorage(itemName);
  if (!localStorageData) return initialData;
  return localStorageData;
};

const getRefreshAccessTokenRemainingTime = () => {
  const grantRefreshTime = avoidLocalStorageUndefined("grantRefreshTime", 0);
  return Date.now() - grantRefreshTime;
};

export {
  arrayRemovedItem,
  saveSecureLocalStorage,
  getSecureLocalStorage,
  avoidLocalStorageUndefined,
  getRefreshAccessTokenRemainingTime,
};
