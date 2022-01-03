import CryptoJS from "crypto-js";
import React from "react";
import Router from "next/router";
import { SECRET_KEY } from "../constants";
import store, { RootState } from "../store";
import { alertActions } from "../store/alertSlice";

const arrayRemovedItem = (item: any, array: any[]) => {
  const result = [...array];

  const removeItemIndex = array.findIndex((atom) => atom === item);
  if (removeItemIndex !== -1) {
    result.splice(removeItemIndex, 1);
  }
  return result;
};

const divideMain = (main: string, nomal: string[]) => {
  const onlyNomal = arrayRemovedItem(main, nomal);
  return [main, ...onlyNomal];
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
  if (!cipherData) return null;
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

const isLogin = () => {
  const loginCurrent = avoidLocalStorageUndefined("accessToken", false);
  return Boolean(loginCurrent);
};

const newError = (errorName: string, errorMessage: string) => {
  const error = new Error(errorMessage);
  error.name = errorName;
  return error;
};

const authRoute = (condition: boolean, redirectUrl: string) => {
  if (condition) {
    Router.push(redirectUrl);
    return <div></div>;
  }
};

export {
  arrayRemovedItem,
  saveSecureLocalStorage,
  getSecureLocalStorage,
  avoidLocalStorageUndefined,
  divideMain,
  isLogin,
  newError,
  authRoute,
};
