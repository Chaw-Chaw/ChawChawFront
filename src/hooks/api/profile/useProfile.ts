import {
  ManageUploadProfileType,
  ManageUserInfoType,
  UploadProfileType,
} from "../../../types/profile";
import {
  MANAGE_USER_API_URL,
  MANAGE_USER_PROFILE_API_URL,
  UPLOAD_PROFILE_API_URL,
} from "../../../constants";
import { useApi } from "../useApi";

export const useProfile = () => {
  const { sendPost, sendGet } = useApi();
  const uploadProfile = async (profile: UploadProfileType) => {
    await sendPost<undefined>(UPLOAD_PROFILE_API_URL, profile);
  };

  const getUserDetailInfo = async (userId: number) => {
    const { data } = await sendGet<ManageUserInfoType>(
      MANAGE_USER_API_URL + `/${userId}`
    );
    return data;
  };
  const manageUploadUserProfile = async (body: ManageUploadProfileType) => {
    await sendPost<undefined>(MANAGE_USER_PROFILE_API_URL, body);
    // message.success("프로필이 수정 되었습니다.");
  };
  return { uploadProfile, getUserDetailInfo, manageUploadUserProfile };
};
