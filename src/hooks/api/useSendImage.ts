import { ChangeEvent, useContext } from "react";
import {
  DELETE_PROFILE_IMAGE_API_URL,
  MANAGE_DELETE_PROFILE_IMAGE_API_URL,
  MANAGE_UPLOAD_PROFILE_IMAGE_API_URL,
  SEND_IMAGE_MSG_API_URL,
  UPLOAD_PROFILE_IMAGE_API_URL,
} from "../../constants/apiUrls";
import { ChatContext } from "../../store/ChatContext";
import { useApi } from "./useApi";

export const useSendImage = () => {
  const { sendFormData, sendDelete } = useApi();
  const { publish } = useContext(ChatContext);

  const putImage = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      if (file === undefined) throw new Error("파일이 없습니다.");
      if (file.size > 1024 * 1024 * 5) {
        throw new Error("5MB 이상 파일을 업로드 할 수 없습니다.");
      }
      const image = new FormData();
      image.append("file", file);
      return image;
    } catch (err) {
      // message.error(err.message);
      throw new Error(err);
    }
  };

  const uploadChatImage = async (image: FormData) => {
    const result = await sendFormData<string>(SEND_IMAGE_MSG_API_URL, image);
    return result.data;
  };

  const sendImageMessage: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    try {
      const image = putImage(e);
      const imageUrl = await uploadChatImage(image);
      publish(imageUrl, "IMAGE");
    } catch (err) {
      // message.error(err.message);
      throw err;
    }
  };

  const sendManageProfileImage = async (image: FormData) => {
    const { data } = await sendFormData<string>(
      MANAGE_UPLOAD_PROFILE_IMAGE_API_URL,
      image
    );
    return data;
  };
  const deleteManageProfileImage = async (userId: number) => {
    const { data } = await sendDelete<string>(
      MANAGE_DELETE_PROFILE_IMAGE_API_URL,
      { userId }
    );
    return data;
  };

  const sendProfileImage = async (image: FormData) => {
    const { data } = await sendFormData<string>(
      UPLOAD_PROFILE_IMAGE_API_URL,
      image
    );
    return data;
  };

  const deleteProfileImage = async () => {
    const { data } = await sendDelete<string>(DELETE_PROFILE_IMAGE_API_URL);
    return data;
  };
  return {
    sendImageMessage,
    putImage,
    sendManageProfileImage,
    deleteManageProfileImage,
    sendProfileImage,
    deleteProfileImage,
  };
};
