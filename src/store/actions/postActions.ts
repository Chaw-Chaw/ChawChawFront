import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  BLOCK_API_URL,
  GET_POSTMODAL_API_URL,
  LIKE_API_URL,
  SEARCH_POST_API_URL,
  UNBLOCK_API_URL,
} from "../../constants";
import { SEARCH_LANGUAGE } from "../../constants/chart";
import {
  PostCardProps,
  PostModalInfoProps,
  SearchPostCardProps,
} from "../../types/post";
import { DefaultResponseBody } from "../../types/response";
import { arrayRemovedItem } from "../../utils";
import { request } from "../../utils/request";
import { authActions } from "../authSlice";

export const getPostCardList = createAsyncThunk(
  "post/getPostCardList",
  async (searchCondition: SearchPostCardProps) => {
    const response = await request.get<DefaultResponseBody<PostCardProps[]>>(
      SEARCH_POST_API_URL,
      { params: searchCondition }
    );
    return response.data.data;
  }
);

export const getPostModalData = createAsyncThunk(
  "post/getPostModalData",
  async (userId: number) => {
    const response = await request.get<DefaultResponseBody<PostModalInfoProps>>(
      GET_POSTMODAL_API_URL + `/${userId}`
    );
    return response.data.data;
  }
);

export const unBlockUser = createAsyncThunk(
  "post/unBlockUser",
  async (userId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = state.auth.user;
    await request.delete(UNBLOCK_API_URL, { data: { userId } });
    const newBlockIds = arrayRemovedItem(userId, user.blockIds || []);
    thunkAPI.dispatch(authActions.updateUser({ blockIds: newBlockIds }));
  }
);

export const blockUser = createAsyncThunk(
  "post/blockUser",
  async (userId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = state.auth.user;
    await request.delete(BLOCK_API_URL, { data: { userId } });
    const newBlockIds = user.blockIds || [];
    newBlockIds.push(userId);
    thunkAPI.dispatch(authActions.updateUser({ blockIds: newBlockIds }));
  }
);

export const like = createAsyncThunk("post/like", async (userId: number) => {
  await request.post(LIKE_API_URL, { userId });
});

export const unLike = createAsyncThunk("post/like", async (userId: number) => {
  await request.delete(LIKE_API_URL, { data: { userId } });
});
