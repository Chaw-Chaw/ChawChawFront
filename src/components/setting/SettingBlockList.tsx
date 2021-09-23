import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { ListItem } from "../common";
import { SettingBlockItem } from "./SettingBlockItem";

interface BlockItem {
  userId: number;
  name: string;
  imageUrl: string;
}

const SettingBlockList: React.FC = () => {
  const { accessToken, grantRefresh } = useContext(AuthContext);
  const [blockList, setBlockList] = useState<BlockItem[]>([]);

  const getBlockList = async () => {
    const response = await axios
      .get("/users/block", {
        headers: {
          Authorization: accessToken,
        },
      })
      .catch((err) => err.response);
    if (response.status == 401) {
      grantRefresh();
      return;
    }
    console.log(response, "getBlockList Info");

    if (!response.data.isSuccess) {
      alert(`데이터 조회 실패`);
      console.error(response.data);
      return;
    }
    setBlockList(response.data.data);
    return;
  };

  useEffect(() => {
    if (!accessToken) return;
    getBlockList();
  }, []);

  return (
    <ListItem title="차단목록">
      {blockList.map((item) => {
        return (
          <SettingBlockItem
            key={item.userId}
            userId={item.userId}
            name={item.name}
            imageUrl={item.imageUrl}
          />
        );
      })}
    </ListItem>
  );
};

export { SettingBlockList };
export type { BlockItem };
