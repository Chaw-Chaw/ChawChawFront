import axios from "axios";
import { useAlert } from "react-alert";
import { NoticeMainRoomResponse } from "../../types/chat";
import { arrayRemovedItem, getSecureLocalStorage } from "../utils";

export const noticeMainRoom = async (mainRoomId: number) => {
  const response = await axios.post<NoticeMainRoomResponse>(
    "/chat/room/enter",
    { roomId: mainRoomId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: getSecureLocalStorage("accessToken"),
        Accept: "application/json",
      },
    }
  );
  return response;
};

export const getNewAlarms = async () => {
  const response = await axios.get("/users/alarm", {
    headers: {
      Authorization: getSecureLocalStorage("accessToken"),
    },
  });
  return response;

  //     .catch((err) => {
  //       console.log(err, "새로운 메세지 받아오기 실패");
  //       return err.response;
  //     });
  //   if (response.status === 401) {
  //     if (response.data.responseMessage === "다른 곳에서 접속함") {
  //       message.error(
  //         "현재 같은 아이디로 다른 곳에서 접속 중 입니다. 계속 이용하시려면 다시 로그인 해주세요.",
  //         {
  //           onClose: () => {
  //             window.localStorage.clear();
  //             window.location.href = "/account/login";
  //           },
  //         }
  //       );
  //     }
  //     await grantRefresh();
  //     await getNewAlarms();
  //     return false;
  //   }

  //   // 알림 목록은 차단된 아이디를 제외하고 받습니다.
  //   const likeMessages: LikeAlarmType[] = response.data.likes.filter(
  //     (item: any) => !user.blockIds?.includes(item.senderId)
  //   );
  //   const newMessages = response.data.messages.filter(
  //     (item: any) => !user.blockIds?.includes(item.senderId)
  //   );
  //   setNewLikes([...likeMessages]);
  //   setNewMessages([...newMessages]);
  //   return true;
};
