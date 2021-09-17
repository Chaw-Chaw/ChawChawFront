import Image from "next/image";
import styled from "styled-components";

interface ChatProfileProps {
  visible: boolean;
  name: string;
  imageUrl: string;
}

const ChatProfile: React.FC<ChatProfileProps> = (props) => {
  return (
    <ChatProfileBox visible={props.visible}>
      <ChatProfileImageSection>
        <ChatProfileImageHeadSection />
        <ChatProfileImageBox>
          <Image
            src={props.imageUrl}
            alt="프로필 이미지"
            width="200"
            height="200"
            objectFit="cover"
            className="chat-profile-image"
          />
        </ChatProfileImageBox>
      </ChatProfileImageSection>
      <ChatUserName>{props.name}</ChatUserName>
    </ChatProfileBox>
  );
};

export default ChatProfile;

const ChatProfileBox = styled.div<{ visible?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  width: 300px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  height: 360px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20px;
  box-sizing: border-box;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .chat-profile-image {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const ChatUserName = styled.h2`
  margin: 0px auto;
  font-size: 1.5rem;
  font-weight: 900;
`;

const ChatProfileImageSection = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatProfileImageHeadSection = styled.div`
  width: 100%;
  height: 120px;
  background-color: ${(props) => props.theme.primaryColor};
`;

const ChatProfileImageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 150px;
  width: 150px;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  border: 10px solid ${(props) => props.theme.primaryColor};
  .post-modal-image {
    border-radius: 50%;
  }
`;
