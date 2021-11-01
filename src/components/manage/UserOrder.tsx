import { Dispatch, SetStateAction } from "react";
import { orderOptions, sortOptions } from "../../constants/order";
// import { userOrderDropDownList } from "../../constants/order";
import {
  CountryLocale,
  LanguageLocale,
  SelectInfoDropDown,
  universityList,
} from "../common";
import { PostOrderBox as UserOrderBox, SelectInfoBox } from "../post/PostOrder";

const UserOrder: React.FC<{
  searchInfo: string[];
  setSearchInfo: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
  const userOrderDropDownList = [
    {
      id: 0,
      initialValue: "선택언어",
      options: Object.keys(LanguageLocale),
    },
    {
      id: 1,
      initialValue: "선택희망언어",
      options: Object.keys(LanguageLocale),
    },
    { id: 2, initialValue: "나라", options: Object.keys(CountryLocale) },
    {
      id: 3,
      initialValue: "학교",
      options: Object.keys(universityList).sort(),
    },
    {
      id: 4,
      initialValue: "정렬",
      options: Object.keys(sortOptions),
    },
    {
      id: 5,
      initialValue: "순서",
      options: Object.keys(orderOptions),
    },
  ];

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
