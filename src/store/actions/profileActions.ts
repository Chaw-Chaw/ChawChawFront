import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";
import {
  DELETE_PROFILE_IMAGE_API_URL,
  MANAGE_DELETE_PROFILE_IMAGE_API_URL,
  MANAGE_USER_API_URL,
  MANAGE_USER_PROFILE_API_URL,
  UPLOAD_PROFILE_API_URL,
  UPLOAD_PROFILE_IMAGE_API_URL,
} from "../../constants";
import {
  ManageUploadProfileType,
  ManageUserInfoType,
  UploadProfileType,
} from "../../types/profile";
import { DefaultResponseBody } from "../../types/response";
import { request } from "../../utils/request";

export const deleteProfileImage = createAsyncThunk(
  "profile/deleteProfileImage",
  async () => {
    const response = await request.delete<DefaultResponseBody<string>>(
      DELETE_PROFILE_IMAGE_API_URL
    );
    return response.data.data;
  }
);

export const sendProfileImage = createAsyncThunk(
  "profile/sendProfileImage",
  async (image: FormData) => {
    const response = await request.post<DefaultResponseBody<string>>(
      UPLOAD_PROFILE_IMAGE_API_URL,
      image,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data.data;
  }
);

export const uploadProfile = createAsyncThunk(
  "profile/uploadProfile",
  async (profile: UploadProfileType) => {
    await request.post(UPLOAD_PROFILE_API_URL, profile);
  }
);

export const getUserDetailInfo = createAsyncThunk(
  "profile/getUserDetailInfo",
  async (userId: number) => {
    const response = await request.get<DefaultResponseBody<ManageUserInfoType>>(
      MANAGE_USER_API_URL + `/${userId}`
    );
    return response.data.data;
  }
);

export const manageUploadUserProfile = createAsyncThunk(
  "profile/manageUploadUserProfile",
  async (body: ManageUploadProfileType) => {
    await request.post(MANAGE_USER_PROFILE_API_URL, body);
  }
);

export const sendManageProfileImage = createAsyncThunk(
  "profile/sendManageProfileImage",
  async (image: FormData) => {
    const response = await request.post<DefaultResponseBody<string>>(
      UPLOAD_PROFILE_IMAGE_API_URL,
      image,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data.data;
  }
);

export const deleteManageProfileImage = createAsyncThunk(
  "profile/deleteManageProfileImage",
  async (userId: number) => {
    const response = await request.delete<DefaultResponseBody<string>>(
      MANAGE_DELETE_PROFILE_IMAGE_API_URL,
      { data: { userId } }
    );
    return response.data.data;
  }
);

export const putImage = (e: ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];
  if (file === undefined) throw new Error("파일이 없습니다.");
  if (file.size > 1024 * 1024 * 5) {
    throw new Error("5MB 이상 파일을 업로드 할 수 없습니다.");
  }
  const image = new FormData();
  image.append("file", file);
  return image;
};
