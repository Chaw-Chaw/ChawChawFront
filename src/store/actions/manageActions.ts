import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DELETE_USER_API_URL,
  MANAGE_DELETE_USER_API_URL,
  MANAGE_UNBLOCK_API_URL,
  MANAGE_USERLIST_API_URL,
} from "../../constants";
import { SearchConditionType, UserListType } from "../../types/manage";
import { DefaultResponseBody } from "../../types/response";
import { request } from "../../utils/request";

export const takeUserList = createAsyncThunk(
  "manage/takeUserList",
  async (searchCondition: SearchConditionType, thunkAPI) => {
    const response = await request.get<DefaultResponseBody<UserListType>>(
      MANAGE_USERLIST_API_URL,
      { params: searchCondition }
    );
    return response.data.data;
  }
);

export const manageUnBlockUser = createAsyncThunk(
  "manage/manageUnBlockUser",
  async (userId: number) => {
    await request.post(MANAGE_UNBLOCK_API_URL, { userId });
  }
);

export const manageBlocUser = createAsyncThunk(
  "manage/manageBlockUser",
  async (userId: number) => {
    await request.post(MANAGE_UNBLOCK_API_URL, { userId });
  }
);

export const deleteManagerUser = createAsyncThunk(
  "manage/deleteManageUser",
  async (userId: number) => {
    await request.delete(MANAGE_DELETE_USER_API_URL, { data: { userId } });
  }
);

export const deleteUser = createAsyncThunk("manage/deleteUser", async () => {
  await request.delete(DELETE_USER_API_URL);
});
