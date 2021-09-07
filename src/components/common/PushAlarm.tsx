import { useContext } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { ChatContext } from "../../store/ChatContext";

const PushAlarm: React.FC = () => {
  const { newMessages } = useContext(ChatContext);
  return <PushAlarmContainer></PushAlarmContainer>;
};

export { PushAlarm };

const PushAlarmContainer = styled.div`
  position: fixed;
  top: 150px;
  left: 20px;
  height: calc(100vh - 400px);
  @media (max-width: 768px) {
    top: 80px;
  }
  width: 300px;
`;
