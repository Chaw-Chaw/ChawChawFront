import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ROLE_ADMIN } from "../../constants";
import { isLogin } from "../../utils";
import {
  alarmChannelSubscribe,
  chatActions,
  getNewAlarms,
  likeChannelSubscribe,
  loginChannelSubscribe,
  noticeMainRoom,
} from "../../store/chatSlice";

const ChatWrapper: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const { role: userRole } = useAppSelector((state) => state.auth.user);
  const { mainRoom } = useAppSelector((state) => state.chat);
  const mainRoomId = mainRoom.id;

  useEffect(() => {
    if (!isLogin()) return;
    if (userRole === ROLE_ADMIN) return;
    (async () => {
      await dispatch(getNewAlarms());
      dispatch(chatActions.connect());
      dispatch(likeChannelSubscribe());
      dispatch(loginChannelSubscribe());
      dispatch(alarmChannelSubscribe());
    })();

    return () => {
      dispatch(chatActions.disconnect());
    };
  }, [userRole, dispatch]);

  useEffect(() => {
    if (mainRoomId === -2) return;
    (async () => {
      await dispatch(noticeMainRoom());
    })();

    if (mainRoomId === -1) return;
    dispatch(chatActions.filterNewMessages());
  }, [mainRoomId, dispatch]);

  return <>{props.children}</>;
};

export default ChatWrapper;
