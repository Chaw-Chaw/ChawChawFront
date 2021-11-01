import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../constants";
import { RoomType } from "../store/ChatContext";

const arrayRemovedItem = (item: any, array: any[]) => {
  const result = array;
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

const getRefreshAccessTokenRemainingTime = () => {
  const grantRefreshTime = avoidLocalStorageUndefined("grantRefreshTime", 0);
  return grantRefreshTime - Date.now();
};

// 이후 다중 채팅 만들시 이러한 방법은 없어지고 userId로 mainRoomId 알아내는 api가 필요합니다.
const isExistRoom = (totalMessage: RoomType[], userId: number) => {
  const room = totalMessage.filter((item) =>
    item.participantIds.includes(userId)
  );
  if (room.length === 0) {
    return false;
  } else {
    return room[0].roomId;
  }
};

export {
  arrayRemovedItem,
  saveSecureLocalStorage,
  getSecureLocalStorage,
  avoidLocalStorageUndefined,
  getRefreshAccessTokenRemainingTime,
  divideMain,
  isExistRoom,
};
