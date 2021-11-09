import { SetStateAction } from "react";

import styled from "styled-components";
import { CountryLocale, SelectInfoDropDown } from "../../common";
import { LanguageInfoDropDown } from "../../common/DropDown/LanguageInfoDropDown";
import { ListItem, ListItemProps } from "../../common/ListItem";
import { ProfileSelectControlButton } from "./ProfileSelectControlButton";
interface ProfileSelectInfoProps extends ListItemProps {
  setValues: React.Dispatch<SetStateAction<string[]>>;
  values: string[];
  type: string;
  count: number;
}

const ProfileSelectInfo: React.FC<ProfileSelectInfoProps> = (props) => {
  const colors = ["#06C074", "#5A65E8", "#4BC6DA"];
  const options = Object.keys(CountryLocale);
  const selectItemListInfo = props.values.map((item, index) => {
    return { value: item, id: index };
  });

  const selectCountryList = selectItemListInfo.map((item) => {
    if (item.id === 0) {
      return (
        <DropDownMainBox key={item.id}>
          <DropDownMainText>main</DropDownMainText>
          <SelectInfoDropDown
            index={item.id}
            type="NORMAL"
            backgroundColor={colors[item.id % 3]}
            initialValue={item.value}
            setValues={props.setValues}
            value={item.value}
            fontSize="0.5rem"
            width="80px"
            height="30px"
            fontWeight="900"
            options={options}
            color="white"
          />
        </DropDownMainBox>
      );
    }
    return (
      <DropDownBox key={item.id}>
        <SelectInfoDropDown
          index={item.id}
          type="NORMAL"
          backgroundColor={colors[item.id % 3]}
          initialValue={item.value}
          setValues={props.setValues}
          value={item.value}
          fontSize="0.5rem"
          width="80px"
          height="30px"
          fontWeight="900"
          options={options}
          color="white"
        />
      </DropDownBox>
    );
  });

  const selectLanguageList = selectItemListInfo.map((item) => {
    if (item.id === 0) {
      return (
        <DropDownMainBox key={item.id}>
          <DropDownMainText>main</DropDownMainText>
          <LanguageInfoDropDown
            index={item.id}
            backgroundColor={colors[item.id % 3]}
            setValues={props.setValues}
            value={item.value}
            fontSize="0.5rem"
            width="80px"
            height="30px"
            fontWeight="900"
            color="white"
            initialValue={item.value}
          />
        </DropDownMainBox>
      );
    }
    return (
      <DropDownBox key={item.id}>
        <LanguageInfoDropDown
          index={item.id}
          backgroundColor={colors[item.id % 3]}
          setValues={props.setValues}
          value={item.value}
          fontSize="0.5rem"
          width="80px"
          height="30px"
          fontWeight="900"
          color="white"
          initialValue={item.value}
        />
      </DropDownBox>
    );
  });

  return (
    <ListItem title={props.title} description={props.description}>
      <ButtonsBox>
        {props.type === "country" ? selectCountryList : selectLanguageList}
        <ProfileSelectControlButton
          values={props.values}
          setValues={props.setValues}
          count={props.count}
        />
      </ButtonsBox>
    </ListItem>
  );
};

export default ProfileSelectInfo;

const DropDownBox = styled.div`
  margin: 0px 2.5px;
`;

const DropDownMainBox = styled(DropDownBox)`
  padding: 5px;
  border-radius: 20rem;
  position: relative;
  border: 2px solid ${(props) => props.theme.primaryColor};
`;

const DropDownMainText = styled.div`
  padding: 0px 5px;
  color: ${(props) => props.theme.primaryColor};
  position: absolute;
  top: -15px;
  left: 50%;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  transform: translateX(-50%);
`;

const ButtonsBox = styled.div`
  margin: 15px 5px 15px 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
