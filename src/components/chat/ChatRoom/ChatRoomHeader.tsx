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
import { FaArrowCircleRight } from "react-icons/fa";

interface ChatRoomHeaderType {
  selectLanguage: string[];
  setSelectLanguage: Dispatch<SetStateAction<string[]>>;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderType> = (props) => {
  const router = useRouter();
  const { setIsViewChatList, mainRoom, setTotalMessage, newMessages } =
    useContext(ChatContext);
  const { grantRefresh } = useContext(AuthContext);

  const backHome: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push("/post");
  };

  const viewChatList: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsViewChatList((pre) => !pre);
  };

  const leaveChatRoom: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
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
      //acessToken 만료
      grantRefresh();
      return;
    }

    if (!response.data.isSuccess) {
      console.error(response.data);
      return;
    }

    setTotalMessage((pre) => {
      const result = pre;
      const resultFilter = result.filter((item) => item.roomId !== mainRoom.id);
      return resultFilter;
    });
    // setMainChatMessages([]);
    // setMainRoom({ id: INITIAL_ROOMID, userId: INITIAL_ID });
    router.push({
      pathname: "/chat",
      query: { userId: INITIAL_ID },
    });
  };

  return (
    <Header>
      <MessagesHeaderIcons>
        <MessageHeaderButton onClick={backHome}>
          {/* <RiHome2Line /> */}
          <FaArrowCircleRight />
        </MessageHeaderButton>
        <MessageHeaderButton onClick={leaveChatRoom}>
          <BsBoxArrowRight />
        </MessageHeaderButton>
        <ChatListViewButtonBox>
          <MessageHeaderButton onClick={viewChatList}>
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
          </MessageHeaderButton>
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
  font-size: 2rem;
  cursor: pointer;
  width: 44px;
  svg {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const ChatListViewButtonBox = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
  }
`;
