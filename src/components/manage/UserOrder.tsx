import { Dispatch, SetStateAction } from "react";
import { SelectInfoDropDown, universityList } from "../common";
import { PostOrderBox as UserOrderBox, SelectInfoBox } from "../post/PostOrder";

const UserOrder: React.FC<{
  searchInfo: string[];
  setSearchInfo: Dispatch<SetStateAction<string[]>>;
}> = (props) => {
  const orderOptions: {
    [index: string]: string;
  } = {
    오름차순: "asc",
    내림차순: "desc",
  };

  const sortOptions: {
    [index: string]: string;
  } = {
    등록일: "date",
    이름: "name",
    좋아요: "like",
    조회수: "view",
  };

  return (
    <UserOrderBox>
      <SelectInfoBox>
        <SelectInfoDropDown
          search
          type="language"
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
          initialValue="언어"
          fontSize="0.9rem"
          setValues={props.setSearchInfo}
          index={0}
          value={props.searchInfo[0]}
        />
      </SelectInfoBox>
      <SelectInfoBox>
        <SelectInfoDropDown
          search
          type="language"
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
          initialValue="희망언어"
          fontSize="0.9rem"
          setValues={props.setSearchInfo}
          index={1}
          value={props.searchInfo[1]}
        />
      </SelectInfoBox>
      <SelectInfoBox>
        <SelectInfoDropDown
          search
          type="country"
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
          initialValue="나라"
          fontSize="0.9rem"
          setValues={props.setSearchInfo}
          index={2}
          value={props.searchInfo[2]}
        />
      </SelectInfoBox>
      <SelectInfoBox>
        <SelectInfoDropDown
          search
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
          initialValue="학교"
          options={Object.keys(universityList).sort()}
          fontSize="0.9rem"
          setValues={props.setSearchInfo}
          index={3}
          value={props.searchInfo[3]}
        />
      </SelectInfoBox>
      <SelectInfoBox>
        <SelectInfoDropDown
          search
          index={4}
          value={props.searchInfo[4]}
          setValues={props.setSearchInfo}
          initialValue="정렬"
          options={Object.keys(sortOptions)}
          fontSize="0.9rem"
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
        />
      </SelectInfoBox>
      <SelectInfoBox>
        <SelectInfoDropDown
          search
          backgroundColor="white"
          width="100px"
          color="#FF8A00"
          initialValue="순서"
          fontSize="0.9rem"
          setValues={props.setSearchInfo}
          index={5}
          options={Object.keys(orderOptions)}
          value={props.searchInfo[5]}
        />
      </SelectInfoBox>
    </UserOrderBox>
  );
};

export { UserOrder };
