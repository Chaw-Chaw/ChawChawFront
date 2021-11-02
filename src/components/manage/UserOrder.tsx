import { Dispatch, SetStateAction } from "react";
import { userOrderDropDownList } from "../../constants/order";
import { SelectInfoDropDown } from "../common";
import { PostOrderBox as UserOrderBox, SelectInfoBox } from "../post/PostOrder";

const UserOrder: React.FC<{
  searchInfo: string[];
  setSearchInfo: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
  const selectInfoDropDown = userOrderDropDownList.map((item) => {
    return (
      <SelectInfoBox key={item.id}>
        <SelectInfoDropDown
          initialValue={item.initialValue}
          setValues={props.setSearchInfo}
          index={item.id}
          value={props.searchInfo[item.id]}
          options={item.options}
          height="30px"
          fontWeight="900"
          type="SEARCH"
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
          fontSize="0.9rem"
        />
      </SelectInfoBox>
    );
  });
  return <UserOrderBox>{selectInfoDropDown}</UserOrderBox>;
};

export { UserOrder };
