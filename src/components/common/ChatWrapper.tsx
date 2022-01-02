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
import { asyncErrorHandle } from "../../store/alertSlice";

const ChatWrapper: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const { role: userRole } = useAppSelector((state) => state.auth.user);
  const { id: mainRoomId } = useAppSelector((state) => state.chat.mainRoom);

  useEffect(() => {
    if (!isLogin()) return;
    if (userRole === ROLE_ADMIN) return;
    try {
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
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }
  }, [userRole, dispatch]);

  useEffect(() => {
    if (mainRoomId === -2) return;
    try {
      (async () => {
        await dispatch(noticeMainRoom());
      })();
    } catch (error) {
      dispatch(asyncErrorHandle(error));
    }

    if (mainRoomId === -1) return;
    dispatch(chatActions.filterNewMessages());
  }, [mainRoomId, dispatch]);

  return <>{props.children}</>;
};

export default ChatWrapper;
