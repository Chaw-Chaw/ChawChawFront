import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  ConfirmChatRoomType,
  GetAlarmsType,
  MakeChatRoomType,
  RoomType,
} from "../../../types/chat";
import {
  BACKEND_URL,
  EXCEPT_ERRORCODES_MSG,
  INITIAL_ID,
} from "../../../constants";
import {
  CONFIRM_CHATROOM_API_URL,
  GET_ALARMS_API_URL,
  GET_MESSAGES_API_URL,
  LEAVE_CHATROOM_API_URL,
  MAKE_CHATROOM_API_URL,
  NOTICE_MAINROOM_API_URL,
  TRANSLATE_CONTEXT,
} from "../../../constants/apiUrls";
import { CHAT_PAGE_URL } from "../../../constants/pageUrls";
import { AuthContext } from "../../../store/AuthContext";
import { ChatContext } from "../../../store/ChatContext";
import { useApi } from "../useApi";

export const useChat = () => {
  const { sendGet, sendPost, sendDelete } = useApi();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { setNewLikes, setNewMessages, setTotalMessage, mainRoom } =
    useContext(ChatContext);

  const getNewAlarms = async () => {
    try {
      const { data } = await sendGet<GetAlarmsType>(GET_ALARMS_API_URL);
      const likeMessages = data.likes;
      const newMessages = data.messages.filter(
        (item) => !user.blockIds?.includes(item.senderId)
      );
      setNewLikes([...likeMessages]);
      setNewMessages([...newMessages]);
      return data;
    } catch (err) {
      const { status } = err.response.data;
      if (status !== "U406") {
        // message.error(EXCEPT_ERRORCODES_MSG);
      }
    }
  };

  const confirmChatRoom = async (userId: number) => {
    const { data } = await sendGet<ConfirmChatRoomType>(
      CONFIRM_CHATROOM_API_URL + `/${userId}`
    );
    return data;
  };

  const noticeMainRoom = async () => {
    await sendPost<undefined>(NOTICE_MAINROOM_API_URL, {
      roomId: mainRoom.id,
    });
    return;
  };

  const getMessageLog = async () => {
    const { data } = await sendGet<RoomType[]>(
      BACKEND_URL + GET_MESSAGES_API_URL
    );
    return data;
  };

  const leaveChat = async () => {
    await sendDelete<undefined>(LEAVE_CHATROOM_API_URL, {
      roomId: mainRoom.id,
    });

    setTotalMessage((pre) => {
      const result = pre;
      const resultFilter = result.filter((item) => item.roomId !== mainRoom.id);
      return resultFilter;
    });

    router.push({
      pathname: CHAT_PAGE_URL,
      query: { userId: INITIAL_ID },
    });
    return;
  };

  const makeChatRoom = async (userId: number) => {
    const {
      data: { roomId },
    } = await sendPost<MakeChatRoomType>(MAKE_CHATROOM_API_URL, { userId });
    return roomId;
  };

  const translateContext = async (context: string, selectLanguage: string) => {
    const { data } = await axios.get(TRANSLATE_CONTEXT, {
      params: {
        q: context,
        source: "",
        target: selectLanguage,
      },
    });
    console.log(data);

    return data.data.translations[0].translatedText;
  };

  return {
    getNewAlarms,
    noticeMainRoom,
    getMessageLog,
    leaveChat,
    translateContext,
    makeChatRoom,
    confirmChatRoom,
  };
};
