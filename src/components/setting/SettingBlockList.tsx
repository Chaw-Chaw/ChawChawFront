import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { AuthContext } from "../../store/AuthContext";
import { getSecureLocalStorage } from "../../utils";
import { ListItem } from "../common";
import { SettingBlockItem } from "./SettingBlockItem";

interface BlockItem {
  userId: number;
  name: string;
  imageUrl: string;
}

const SettingBlockList: React.FC = () => {
  const { isLogin, grantRefresh } = useContext(AuthContext);
  const [blockList, setBlockList] = useState<BlockItem[]>([]);
  const message = useAlert();

  const getBlockList = async () => {
    const response = await axios
      .get("/users/block", {
        headers: {
          Authorization: getSecureLocalStorage("accessToken"),
        },
      })
      .catch((err) => err.response);
    if (response.status == 401) {
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
      await grantRefresh();
      await getBlockList();
      return;
    }

    console.log(response, "getBlockList Info");

    if (!response.data.isSuccess) {
      console.log(response, "데이터 조회 실패");
      return;
    }

    return response.data.data;
  };

  useEffect(() => {
    if (!isLogin) return;
    (async () => {
      const result = await getBlockList();
      setBlockList(result);
    })();
  }, []);

  return (
    <ListItem title="차단목록">
      <SettingBlockBox>
        {blockList.length > 0 ? (
          blockList.map((item) => {
            return (
              <SettingBlockItem
                key={item.userId}
                userId={item.userId}
                name={item.name}
                imageUrl={item.imageUrl}
              />
            );
          })
        ) : (
          <EmptyBlockList>
            <EmptyBlockListPhrase>
              🗑 차단 목록이 비어있습니다.
            </EmptyBlockListPhrase>
          </EmptyBlockList>
        )}
      </SettingBlockBox>
    </ListItem>
  );
};

export { SettingBlockList };
export type { BlockItem };

const SettingBlockBox = styled.div`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const EmptyBlockList = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
`;

const EmptyBlockListPhrase = styled.span`
  margin: auto;
  color: ${(props) => props.theme.secondaryColor};
`;
