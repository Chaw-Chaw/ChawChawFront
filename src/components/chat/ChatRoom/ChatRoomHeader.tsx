import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, MouseEventHandler, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { INITIAL_ID, LIMIT_NEWALARM_SIZE } from "../../../constants";
import { AuthContext } from "../../../store/AuthContext";
import { ChatContext } from "../../../store/ChatContext";
import { getSecureLocalStorage } from "../../../utils";
import { RiHome2Line } from "react-icons/ri";
import { BsBoxArrowRight, BsChatDots } from "react-icons/bs";
import { AlarmCount, ChangeLanguageDropDown } from "../../common";
import { useAlert } from "react-alert";

interface ChatRoomHeaderType {
  selectLanguage: string[];
  setSelectLanguage: Dispatch<SetStateAction<string[]>>;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderType> = (props) => {
  const router = useRouter();
  const message = useAlert();
  const { setIsViewChatList, mainRoom, setTotalMessage, newMessages } =
    useContext(ChatContext);
  const { grantRefresh } = useContext(AuthContext);

  const handleClickBackHomeBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push("/post");
  };

  const handleClickViewChatListBtn: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    setIsViewChatList((pre) => !pre);
  };

  const handleClickLeaveChatBtn: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const result = await leaveChat();
    if (!result) return;

    setTotalMessage((pre) => {
      const result = pre;
      const resultFilter = result.filter((item) => item.roomId !== mainRoom.id);
      return resultFilter;
    });

    router.push({
      pathname: "/chat",
      query: { userId: INITIAL_ID },
    });
  };

  const leaveChat = async () => {
    const response = await axios
      .delete("/chat/room", {
        data: {
          roomId: mainRoom.id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: getSecureLocalStorage("accessToken"),
          Accept: "application/json",
        },
      })
      .catch((err) => err.response);

    console.log(response, "leaveChatRoom");

    if (response.status === 401) {
      if (response.data.responseMessage === "다른 곳에서 접속함") {
        message.error(
          "현재 같은 아이디로 다른 곳에서 접속 중 입니다. 계속 이용하시려면 다시 로그인 해주세요.",
          {
            onClose: () => {
              window.localStorage.clear();
              window.location.href = "/account/login";
            },
          }
        );
      }
      //acessToken 만료
      await grantRefresh();
      await leaveChat();
      return false;
    }

    if (!response.data.isSuccess) {
      console.log(response.data);
      return false;
    }
    return true;
  };

  return (
    <Header>
      <MessagesHeaderIcons>
        <BackHomeButton onClick={handleClickBackHomeBtn}>
          <RiHome2Line />
        </BackHomeButton>
        <LeaveChatButton onClick={handleClickLeaveChatBtn}>
          <BsBoxArrowRight />
        </LeaveChatButton>
        <ChatListViewButtonBox>
          <ViewChatListButton onClick={handleClickViewChatListBtn}>
            <BsChatDots />
            {newMessages.length !== 0 && (
              <AlarmCount>
                <span>
                  {newMessages.length > LIMIT_NEWALARM_SIZE
                    ? LIMIT_NEWALARM_SIZE
                    : newMessages.length}
                </span>
              </AlarmCount>
            )}
          </ViewChatListButton>
        </ChatListViewButtonBox>
      </MessagesHeaderIcons>
      <ChangeLanguageDropDown
        selectLanguage={props.selectLanguage}
        setSelectLanguage={props.setSelectLanguage}
      />
    </Header>
  );
};

export { ChatRoomHeader };

const Header = styled.div`
  align-items: center;
  position: sticky;
  top: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.theme.id === "light"
      ? "1px solid rgb(0, 0, 0, 0.2)"
      : "1px solid rgb(255, 255, 255, 0.2)"};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 50px;
  z-index: 20;
  @media (max-width: 768px) {
    top: 70px;
    position: fixed;
    left: 0px;
  }
`;

const MessagesHeaderIcons = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MessageHeaderButton = styled.button`
  display: flex;
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  cursor: pointer;
  width: 44px;
  svg {
    font-size: 2rem;
    color: ${(props) => props.theme.primaryColor};
  }
`;

const ChatListViewButtonBox = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const BackHomeButton = styled(MessageHeaderButton)``;
const LeaveChatButton = styled(MessageHeaderButton)``;
const ViewChatListButton = styled(MessageHeaderButton)``;
