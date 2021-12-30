import { createAsyncThunk } from "@reduxjs/toolkit";
import { MANAGE_USERLIST_API_URL } from "../../constants";
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
