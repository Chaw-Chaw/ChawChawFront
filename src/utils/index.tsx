import crypto from "crypto-js";
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
  const cipherData = JSON.stringify(CryptoJS.AES.encrypt(item, SECRET_KEY));
  window.localStorage.setItem(itemName, cipherData);
};
const getSecureLocalStorage = (itemName: string) => {
  const originalData = window.localStorage.getItem(itemName);
  if (!originalData) return undefined;
  return JSON.parse(originalData);
};

export { arrayRemovedItem, saveSecureLocalStorage, getSecureLocalStorage };
